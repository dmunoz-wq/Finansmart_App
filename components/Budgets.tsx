import styles, { createStyles } from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { AlertTriangle } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';

export default function Budgets(){
  const { budgets, setBudgets, monthlyBudgetLimit, setMonthlyBudgetLimit } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const isDark = theme === 'dark';
  const themeStyles = createStyles(isDark);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🏷️');
  const [total, setTotal] = useState('');
  const [error, setError] = useState('');
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [editingMonthlyBudget, setEditingMonthlyBudget] = useState(false);

  const percent = (b:any) => Math.round((b.spent / b.total) * 100);
  const totalSpent = budgets.reduce((s:number,b:any)=> s + Number(b.spent), 0);
  const monthlyPercent = Math.round((totalSpent / monthlyBudgetLimit) * 100);
  
  // Calculate total allocated to non-General budgets
  const otherBudgetsTotal = budgets.reduce((s:number,b:any)=> b.name === 'General' ? s : s + Number(b.total), 0);
  // General budget is what's left from monthly total
  const generalBudgetTotal = Math.max(0, monthlyBudgetLimit - otherBudgetsTotal);
  
  // Get the actual General budget object
  const generalBudget = budgets.find((b:any) => b.name === 'General');
  // Available space in General = total - what's already spent
  const generalAvailable = Math.max(0, generalBudgetTotal - (generalBudget?.spent || 0));

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Presupuesto Mensual</Text>
        <TouchableOpacity onPress={() => {
          setEditingMonthlyBudget(true);
          setTotal(String(monthlyBudgetLimit));
          setModalVisible(true);
        }} style={[themeStyles.monthBudgetCard]}>
          <Text style={{fontWeight:'600', color: colors.text}}>Total</Text>
          <Text style={{fontSize:20,fontWeight:'700', color: colors.text}}>${monthlyBudgetLimit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
          <View style={{marginTop:8}}>
            <View style={[styles.progressTrack, { backgroundColor: isDark ? '#0B1115' : '#F3F4F6' }]}><View style={[styles.progressFill,{width:`${Math.min(100, monthlyPercent)}%`}]} /></View>
            <Text style={{marginTop:6, color: colors.text}}>{monthlyPercent}% gastado (${totalSpent.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})})</Text>
          </View>
          <Text style={{marginTop:6, color: colors.icon, fontSize:12}}>Toca para editar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Categorías</Text>
        {budgets.map((b:any)=>{
          const p = percent(b);
          const color = b.name === 'General' ? '#FBBF24' : p >= 85 ? '#E53E3E' : p >= 60 ? '#F59E0B' : '#10B981';
          // For General budget, use calculated total
          const displayTotal = b.name === 'General' ? generalBudgetTotal : b.total;
          return (
            <View key={b.id} style={[themeStyles.budgetCard]}>
              <Text style={styles.budgetIcon}>{b.icon}</Text>
              <View style={{flex:1}}>
                <Text style={{fontWeight:'600', color: colors.text}}>{b.name}</Text>
                <Text style={{color: colors.icon}}>${b.spent} / ${displayTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
                <View style={[styles.progressTrack,{marginTop:6}]}> 
                  <View style={[styles.progressFill,{width:`${Math.min(100,Math.round((b.spent/displayTotal)*100))}%`, backgroundColor: color}]} />
                </View>
              </View>
              {b.name !== 'General' && (
                <View style={{marginLeft:12}}>
                  <TouchableOpacity onPress={() => {
                    // open modal for editing this budget
                    setEditingBudgetId(b.id);
                    setName(b.name || '');
                    setIcon(b.icon || '🏷️');
                    setTotal(String(b.total || ''));
                    setError('');
                    setModalVisible(true);
                  }} style={{padding:6}}>
                    <Text style={{color: colors.text}}>Editar</Text>
                  </TouchableOpacity>
                </View>
              )}
              {(b.name === 'General' && p > 80) || (b.name !== 'General' && p > 80) ? <AlertTriangle color="#E53E3E" /> : null}
            </View>
          );
        })}

        <TouchableOpacity onPress={() => { setError(''); setModalVisible(true); }} style={styles.dashedButton}><Text style={{ color: colors.text }}>Crear Nuevo Presupuesto</Text></TouchableOpacity>
      </View>
      
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface }]}> 
            <Text style={{ fontWeight: '700', fontSize: 18, color: colors.text, marginBottom: 8 }}>{editingMonthlyBudget ? 'Editar Presupuesto Mensual' : editingBudgetId ? 'Editar Presupuesto' : 'Crear Nuevo Presupuesto'}</Text>
            {!editingMonthlyBudget && (
              <>
                <TextInput placeholder="Nombre (p. ej. Comida)" placeholderTextColor={colors.icon} style={styles.input} value={name} onChangeText={setName} />
                <TextInput placeholder="Icono (emoji)" placeholderTextColor={colors.icon} style={styles.input} value={icon} onChangeText={setIcon} />
              </>
            )}
            <TextInput placeholder="Total (ej. 200)" placeholderTextColor={colors.icon} style={styles.input} value={total} onChangeText={setTotal} keyboardType="numeric" />
            {error ? <Text style={{ color: '#E53E3E', marginTop: 6 }}>{error}</Text> : null}

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:12}}>
              <TouchableOpacity onPress={() => { setModalVisible(false); setName(''); setIcon('🏷️'); setTotal(''); setError(''); setEditingBudgetId(null); setEditingMonthlyBudget(false); }} style={{ padding:10 }}>
                <Text style={{ color: colors.text }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                const parsed = parseFloat(total || '0');
                if (isNaN(parsed) || parsed <= 0) {
                  setError('Introduce un total válido (> 0)');
                  return;
                }
                if (editingMonthlyBudget) {
                  // update monthly budget limit
                  setMonthlyBudgetLimit(parsed);
                } else if (editingBudgetId) {
                  // update existing budget
                  const currentBudget = budgets.find((x:any) => x.id === editingBudgetId);
                  const currentTotal = currentBudget?.total || 0;
                  const difference = parsed - currentTotal;
                  // Check if new total would exceed General budget available (total - spent)
                  if (difference > generalAvailable) {
                    setError(`Este valor sobrepasa el presupuesto disponible en General. Disponible: $${generalAvailable.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`);
                    return;
                  }
                  const updated = budgets.map((x:any) => x.id === editingBudgetId ? { ...x, name, icon: icon || '🏷️', total: parsed, spent: Math.min(x.spent, parsed) } : x);
                  setBudgets(updated);
                } else {
                  // create new budget
                  if (!name) {
                    setError('Introduce un nombre válido');
                    return;
                  }
                  // Check if new budget total exceeds General budget available (total - spent)
                  if (parsed > generalAvailable) {
                    setError(`Este valor sobrepasa el presupuesto disponible en General. Disponible: $${generalAvailable.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`);
                    return;
                  }
                  const newBudget = { id: String(Date.now()), name, icon: icon || '🏷️', spent: 0, total: parsed };
                  setBudgets([newBudget, ...budgets]);
                }
                setModalVisible(false);
                setName(''); setIcon('🏷️'); setTotal(''); setEditingBudgetId(null); setEditingMonthlyBudget(false);
              }} style={[styles.primaryButton, { paddingHorizontal:16, paddingVertical:10 }]}> 
                <Text style={styles.primaryButtonText}>{editingMonthlyBudget ? 'Actualizar' : 'Crear'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
