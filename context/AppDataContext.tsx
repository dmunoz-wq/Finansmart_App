import { initialBudgets, initialTransactions } from '@/constants/initialData';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type AppData = {
  transactions: any[];
  addTransaction: (tx: any) => void;
  deleteTransaction: (id: string) => void;
  budgets: any[];
  setBudgets: (b: any) => void;
  monthlyBudgetLimit: number;
  setMonthlyBudgetLimit: (limit: number) => void;
  checkBudgetAlerts: (budgetId: string, budgetName: string, spent: number, total: number) => void;
  checkMonthlyBudgetAlert: (totalSpent: number) => void;
};

const AppDataContext = createContext<AppData | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [budgets, setBudgets] = useState<any[]>(initialBudgets);
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState<number>(2500);
  const [alertsShown, setAlertsShown] = useState<string[]>([]);

  // Load persisted data on mount
  useEffect(() => {
    (async () => {
      try {
        const txJson = await AsyncStorage.getItem('@finansmart:transactions');
        const bJson = await AsyncStorage.getItem('@finansmart:budgets');
        const mbJson = await AsyncStorage.getItem('@finansmart:monthlyBudgetLimit');
        if (txJson) setTransactions(JSON.parse(txJson));
        if (bJson) setBudgets(JSON.parse(bJson));
        if (mbJson) setMonthlyBudgetLimit(Number(mbJson));
      } catch (e) {
        // ignore load errors
      }
    })();
  }, []);

  // Persist transactions when they change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@finansmart:transactions', JSON.stringify(transactions));
      } catch (e) {
        // ignore save errors
      }
    })();
  }, [transactions]);

  // Persist budgets when they change
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@finansmart:budgets', JSON.stringify(budgets));
      } catch (e) {
        // ignore save errors
      }
    })();
  }, [budgets]);

  // Persist monthly budget limit when it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@finansmart:monthlyBudgetLimit', String(monthlyBudgetLimit));
      } catch (e) {
        // ignore save errors
      }
    })();
  }, [monthlyBudgetLimit]);

  const formatDateGroup = (d: Date) => {
    const today = new Date();
    const diff = Math.floor((+today - +d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Ayer';
    return d.toLocaleDateString();
  };

  const addTransaction = (tx: any) => {
    const dateObj = new Date();
    const date = dateObj.toLocaleDateString();
    const dateGroup = formatDateGroup(dateObj);
    const newTx = { ...tx, id: String(Date.now()), date, dateGroup };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (tx && tx.type === 'expense' && tx.budgetId) {
      // Restar el gasto del presupuesto
      const updated = budgets.map((b: any) => 
        b.id === tx.budgetId 
          ? { ...b, spent: Math.max(0, Number(b.spent) - Number(tx.amount)) }
          : b
      );
      setBudgets(updated);
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const checkBudgetAlerts = (budgetId: string, budgetName: string, spent: number, total: number) => {
    const percent = Math.round((spent / total) * 100);
    const thresholds = [50, 80, 100];
    
    for (const threshold of thresholds) {
      if (percent >= threshold) {
        const alertKey = `${budgetId}_${threshold}`;
        if (!alertsShown.includes(alertKey)) {
          Alert.alert(
            '⚠️ Alerta de Presupuesto',
            `Has gastado el ${percent}% de tu presupuesto "${budgetName}" (${spent}/${total})`
          );
          setAlertsShown((prev) => [...prev, alertKey]);
        }
      }
    }
  };

  const checkMonthlyBudgetAlert = (totalSpent: number) => {
    const percent = Math.round((totalSpent / monthlyBudgetLimit) * 100);
    const thresholds = [50, 80, 100];
    
    for (const threshold of thresholds) {
      if (percent >= threshold) {
        const alertKey = `monthly_${threshold}`;
        if (!alertsShown.includes(alertKey)) {
          Alert.alert(
            '⚠️ Alerta de Presupuesto Mensual',
            `Has gastado el ${percent}% de tu presupuesto mensual (${totalSpent.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}/${monthlyBudgetLimit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})})`
          );
          setAlertsShown((prev) => [...prev, alertKey]);
        }
      }
    }
  };

  const value = useMemo(() => ({ transactions, addTransaction, deleteTransaction, budgets, setBudgets, monthlyBudgetLimit, setMonthlyBudgetLimit, checkBudgetAlerts, checkMonthlyBudgetAlert }), [transactions, budgets, monthlyBudgetLimit, alertsShown]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useApp must be used within AppDataProvider');
  return ctx;
}
