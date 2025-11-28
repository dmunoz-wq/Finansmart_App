import { initialBudgets, initialTransactions } from '@/constants/initialData';
import storage from '@/utils/storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

type AppData = {
  transactions: any[];
  addTransaction: (tx: any) => void;
  setTransactions: (txs: any[]) => void;
  budgets: any[];
  setBudgets: (b: any) => void;
  monthlyBudget: number | null;
  remainingBudget: number | null;
  setMonthlyBudget: (v: number) => void;
  resetData: () => void;
  resetToZero: () => void;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactionsState] = useState<any[]>(initialTransactions);
  const [budgets, setBudgets] = useState<any[]>(initialBudgets);
  const [monthlyBudget, setMonthlyBudgetState] = useState<number | null>(null);
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [lastAlertLevel, setLastAlertLevel] = useState<number>(0);

  // Load persisted budget on mount
  useEffect(() => {
    (async () => {
      try {
        const mb = await storage.getItem('monthlyBudget');
        const rb = await storage.getItem('remainingBudget');
        if (mb) setMonthlyBudgetState(Number(mb));
        if (rb) setRemainingBudget(Number(rb));
        // if there's a monthly budget but no remaining, compute from transactions
        if (mb && !rb) {
          const mbNum = Number(mb);
          const spent = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0);
          const rem = Math.max(0, mbNum - spent);
          setRemainingBudget(rem);
          await storage.setItem('remainingBudget', String(rem));
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const addTransaction = (tx: any) => {
    const amount = Number(tx.amount || 0);
    // compute current balance
    const incomeTotal = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount || 0), 0);
    const expenseTotal = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0);
    const currentBalance = incomeTotal - expenseTotal;

    // prevent negative account balance
    if (tx.type === 'expense' && amount > currentBalance) {
      Alert.alert('Saldo insuficiente', 'No tiene saldo suficiente');
      return;
    }

    const newTx = { ...tx, id: String(Date.now()) };
    setTransactionsState((prev) => [newTx, ...prev]);

    // If expense, decrease remaining budget and possibly alert
    if (tx.type === 'expense') {
      const amount = Number(tx.amount || 0);
      setRemainingBudget((prev) => {
        const prevVal = typeof prev === 'number' ? prev : (monthlyBudget ?? 0);
        const newRem = Math.max(0, prevVal - amount);
        (async () => {
          try {
            await storage.setItem('remainingBudget', String(newRem));
          } catch (e) {}
        })();

        // determine percent spent
        if (monthlyBudget && monthlyBudget > 0) {
          const spent = monthlyBudget - newRem;
          const pct = Math.round((spent / monthlyBudget) * 100);
          if (pct >= 100 && lastAlertLevel < 100) {
            Alert.alert('Presupuesto', 'Has gastado el 100% de tu presupuesto mensual. No queda nada.');
            setLastAlertLevel(100);
          } else if (pct >= 80 && lastAlertLevel < 80) {
            Alert.alert('Advertencia', 'Has alcanzado el 80% de tu presupuesto. Ten cuidado.');
            setLastAlertLevel(80);
          } else if (pct >= 50 && lastAlertLevel < 50) {
            Alert.alert('Aviso', 'Vas por la mitad del presupuesto (50%).');
            setLastAlertLevel(50);
          }
        }

        return newRem;
      });

      // Update budgets: add spent to matching division or to 'extras'
      setBudgets((prev:any[])=>{
        const cat = typeof tx.category === 'string' ? tx.category.toString() : '';
        const lcCat = cat.toLowerCase();
        let found = false;
        const next = prev.map((b:any)=>{
          const bn = (b.name || '').toString().toLowerCase();
          if (bn === lcCat || bn.includes(lcCat) || lcCat.includes(bn.replace('categories.','')) ){
            found = true;
            return { ...b, spent: Number(b.spent || 0) + amount };
          }
          return b;
        });
        if (!found) {
          // try find 'extras'
          const ex = next.find((x:any)=> (x.name||'').toString().toLowerCase().includes('extras') || (x.name||'').toString().toLowerCase().includes('other'));
          if (ex) {
            return next.map((b:any)=> b === ex ? { ...b, spent: Number(b.spent || 0) + amount } : b);
          }
          // otherwise append an extras bucket
          return [{ id: `extras_${Date.now()}`, name: 'extras', icon: '✨', spent: amount, total: 0 }, ...next];
        }
        return next;
      });
    }
  };

  const setTransactions = (txs: any[]) => {
    setTransactionsState(txs || []);
  };

  const setMonthlyBudget = async (v: number) => {
    setMonthlyBudgetState(v);
    // compute remaining based on existing expenses
    const spent = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0);
    const rem = Math.max(0, v - spent);
    setRemainingBudget(rem);
    try {
      await storage.setItem('monthlyBudget', String(v));
      await storage.setItem('remainingBudget', String(rem));
    } catch (e) {}
    setLastAlertLevel(0);
  };

  const resetToZero = async () => {
    // only reset budget-related values (do not clear transactions)
    const zeroedBudgets = (budgets || []).map((b:any) => ({ ...b, spent: 0 }));
    setBudgets(zeroedBudgets);
    setMonthlyBudgetState(0);
    setRemainingBudget(0);
    setLastAlertLevel(0);
    try {
      await storage.setItem('monthlyBudget', '0');
      await storage.setItem('remainingBudget', '0');
    } catch (e) {}
    Alert.alert('Reset', 'Valores del presupuesto reiniciados a 0.');
  };

  const resetData = async () => {
    setTransactions(initialTransactions);
    setBudgets(initialBudgets);
    setMonthlyBudgetState(null);
    setRemainingBudget(null);
    setLastAlertLevel(0);
    try {
      await storage.setItem('monthlyBudget', '');
      await storage.setItem('remainingBudget', '');
    } catch (e) {}
    Alert.alert('Reset', 'Datos reiniciados al estado inicial.');
  };

  const value = useMemo(() => ({ transactions, addTransaction, setTransactions, budgets, setBudgets, monthlyBudget, remainingBudget, setMonthlyBudget, resetData, resetToZero }), [transactions, budgets, monthlyBudget, remainingBudget]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useApp must be used within AppDataProvider');
  return ctx;
}
