import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTransactionModal({ visible, onClose }:{visible:boolean,onClose:()=>void}){
  const { addTransaction, budgets, setBudgets, monthlyBudgetLimit, checkBudgetAlerts, checkMonthlyBudgetAlert } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [type, setType] = useState<'expense'|'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [note, setNote] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const save = ()=>{
    const parsed = Number(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) return;

    // If expense, assign to a budget (selected or General by default)
    let txCategory = category;
    let budgetId = selectedBudgetId;
    if (type === 'expense') {
      // If no budget selected, use General budget
      if (!selectedBudgetId) {
        const generalBudget = budgets.find((x:any) => x.name === 'General');
        if (generalBudget) {
          budgetId = generalBudget.id;
          txCategory = generalBudget.name;
        }
      } else {
        const b = budgets.find((x:any) => x.id === selectedBudgetId);
        if (b) {
          txCategory = b.name;
        }
      }
      // update budgets spent for the assigned budget
      const updated = budgets.map((x:any) => {
        if (x.id === budgetId) {
          const newSpent = Number(x.spent) + parsed;
          // Check alerts for this budget
          checkBudgetAlerts(x.id, x.name, newSpent, x.total);
          return { ...x, spent: newSpent };
        }
        return x;
      });
      setBudgets(updated);
      
      // Check monthly budget alert
      const totalSpent = updated.reduce((s:number, b:any) => s + Number(b.spent), 0);
      checkMonthlyBudgetAlert(totalSpent);
    }

    addTransaction({ type, amount: parsed, title: txCategory, category: txCategory, date: 'Hoy', dateGroup: 'Hoy', note, budgetId });
    setAmount(''); setNote(''); setCategory('General'); setSelectedBudgetId(null); onClose();
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface }]}> 
          <View style={styles.modalHeader}>
            <Text style={{fontWeight:'700', color: colors.text}}>Nueva Transacción</Text>
            <TouchableOpacity onPress={onClose}><Text style={{ color: colors.text }}>Cancelar</Text></TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'center',marginVertical:8}}>
            <TouchableOpacity onPress={()=>setType('expense')} style={[styles.typeToggle, { borderColor: colors.border }, type==='expense' && {borderColor:'#E53E3E'}]}><Text style={{ color: colors.text }}>Gasto</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>setType('income')} style={[styles.typeToggle, { borderColor: colors.border }, type==='income' && {borderColor:'#10B981'}]}><Text style={{ color: colors.text }}>Ingreso</Text></TouchableOpacity>
          </View>

          <TextInput placeholder='$0.00' keyboardType='numeric' value={amount} onChangeText={setAmount} style={[styles.amountInput, { color: colors.text }]} placeholderTextColor={colors.icon} />
          <TextInput placeholder='Categoría' value={category} onChangeText={setCategory} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
          {type === 'expense' && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 6 }}>Asignar a presupuesto</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {budgets.map((b:any) => (
                  <TouchableOpacity key={b.id} onPress={() => { setSelectedBudgetId(b.id); setCategory(b.name); }} style={{ padding:8, borderRadius:10, borderWidth: selectedBudgetId===b.id ? 2 : 1, borderColor: selectedBudgetId===b.id ? '#FF6B35' : colors.border, marginRight:8, marginBottom:8, backgroundColor: colors.surface }}>
                    <Text style={{ color: colors.text }}>{b.icon} {b.name}</Text>
                    <Text style={{ color: colors.icon, fontSize:12 }}>${b.spent} / ${b.total}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          <TextInput placeholder='Nota (opcional)' value={note} onChangeText={setNote} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />

          <TouchableOpacity onPress={save} style={[styles.primaryButton, {marginTop:12}]}><Text style={styles.primaryButtonText}>Guardar</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
