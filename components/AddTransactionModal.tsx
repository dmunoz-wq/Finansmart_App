import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTransactionModal({ visible, onClose }:{visible:boolean,onClose:()=>void}){
  const { addTransaction, budgets } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [type, setType] = useState<'expense'|'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('extras');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const { t } = useTranslation();

  const save = ()=>{
    if(!amount) return;
    const amt = Number(amount);
    // If expense and a division is selected, validate against division remaining
    if(type === 'expense' && selectedDivision && budgets){
      const div = budgets.find((b:any)=> b.id === selectedDivision);
      if(div){
        const remaining = (Number(div.total || 0) - Number(div.spent || 0));
        if(amt > remaining){
          Alert.alert('Límite excedido', 'No puedes superar el límite de esta división. Modifica el monto o el tope.');
          // deselect division and fall back to extras
          setSelectedDivision(null);
          setCategory('extras');
          return;
        }
      }
    }

    addTransaction({ type, amount: amt, title: category, category, date: 'Hoy', dateGroup: 'Hoy', note });
    setAmount(''); setNote(''); setCategory('extras'); setSelectedDivision(null); onClose();
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface }]}> 
          <View style={styles.modalHeader}>
            <Text style={{fontWeight:'700', color: colors.text}}>{t('transactions.newTransaction')}</Text>
            <TouchableOpacity onPress={onClose}><Text style={{ color: colors.text }}>{t('transactions.cancel')}</Text></TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent:'center',marginVertical:8}}>
            <TouchableOpacity onPress={()=>setType('expense')} style={[styles.typeToggle, { borderColor: colors.border }, type==='expense' && {borderColor:'#E53E3E'}]}><Text style={{ color: colors.text, includeFontPadding:true }}>{t('transactions.expense')}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>setType('income')} style={[styles.typeToggle, { borderColor: colors.border }, type==='income' && {borderColor:'#10B981'}]}><Text style={{ color: colors.text, includeFontPadding:true }}>{t('transactions.income')}</Text></TouchableOpacity>
          </View>

          <TextInput placeholder='$0.00' keyboardType='numeric' value={amount} onChangeText={setAmount} style={[styles.amountInput, { color: colors.text }]} placeholderTextColor={colors.icon} />
          {type === 'expense' && budgets && budgets.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical:8}} contentContainerStyle={{paddingRight:8}}>
              {budgets.map((b:any)=> {
                const isSelected = selectedDivision === b.id || category === b.name;
                return (
                  <TouchableOpacity key={b.id} onPress={()=>{
                    // toggle selection
                    if(selectedDivision === b.id){
                      setSelectedDivision(null);
                      setCategory('extras');
                    } else {
                      setCategory(b.name);
                      setSelectedDivision(b.id);
                    }
                  }} style={{marginRight:8, paddingHorizontal:12, paddingVertical:8, borderRadius:12, borderWidth:1, borderColor: isSelected ? colors.tint : colors.border, backgroundColor: isSelected ? (theme === 'dark' ? '#0B2F2F' : '#ECFDF5') : colors.surface }}>
                    <Text style={{ color: isSelected ? colors.tint : colors.text, fontWeight: isSelected ? '700' : '600', includeFontPadding:true }}>{(b.name && b.name.startsWith('categories.')) ? t(b.name) : b.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <TextInput placeholder={t('transactions.categoryPlaceholder')} value={category} onChangeText={setCategory} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
          )}
          <TextInput placeholder={t('transactions.notePlaceholder')} value={note} onChangeText={setNote} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />

          <TouchableOpacity onPress={save} style={[styles.primaryButton, {marginTop:12}]}><Text style={styles.primaryButtonText}>{t('transactions.save')}</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
