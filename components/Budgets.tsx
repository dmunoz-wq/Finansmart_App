import styles from '@/components/finansmartStyles';
import { initialBudgets } from '@/constants/initialData';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Budgets(){
  const { budgets, monthlyBudget, remainingBudget, setMonthlyBudget, resetData, resetToZero, setBudgets } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const percent = (b:any) => Math.round((b.spent / b.total) * 100);
  const [inputBudget, setInputBudget] = useState(monthlyBudget ? String(monthlyBudget) : '');
  const totalSpent = budgets.reduce((s:any,b:any)=> s + Number(b.spent||0), 0);
  const overallBudget = monthlyBudget ?? 0;
  const overallRemaining = remainingBudget ?? Math.max(0, overallBudget - totalSpent);
  const overallPercent = overallBudget > 0 ? Math.round(((overallBudget - overallRemaining)/overallBudget)*100) : 0;
  const { t } = useTranslation();
  const [divisionOpen, setDivisionOpen] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [divisionTotal, setDivisionTotal] = useState('');
  const [divisionIcon, setDivisionIcon] = useState('📦');
  const [editOpen, setEditOpen] = useState(false);
  const [divisionEdit, setDivisionEdit] = useState<any | null>(null);

  const createDefaultDivisions = () => {
    const mb = monthlyBudget ?? 0;
    if (mb && mb > 0) {
      const divisions = [
        { id: 'd_food', name: 'categories.food', icon: '🍔', spent: 0, total: Math.round(mb * 0.30) },
        { id: 'd_transport', name: 'categories.transport', icon: '🚗', spent: 0, total: Math.round(mb * 0.15) },
        { id: 'd_bills', name: 'categories.home', icon: '🏠', spent: 0, total: Math.round(mb * 0.25) },
        { id: 'd_ent', name: 'categories.entertainment', icon: '🎮', spent: 0, total: Math.round(mb * 0.10) },
        { id: 'd_extras', name: 'extras', icon: '✨', spent: 0, total: Math.max(0, mb - Math.round(mb * 0.30) - Math.round(mb * 0.15) - Math.round(mb * 0.25) - Math.round(mb * 0.10)) },
      ];
      setBudgets(divisions);
    } else {
      // fallback to initial static budgets if no monthlyBudget set
      setBudgets(initialBudgets || []);
    }
  };

  const addDivision = () => {
    const name = divisionName.trim();
    const total = Number(divisionTotal || 0);
    if (!name || total <= 0) { Alert.alert('Error', 'Ingrese nombre y monto válidos'); return; }
    const id = `d_${Date.now()}`;
    const newDiv = { id, name, icon: divisionIcon || '📦', spent: 0, total };
    setBudgets([...(budgets || []), newDiv]);
    setDivisionOpen(false); setDivisionName(''); setDivisionTotal(''); setDivisionIcon('📦');
  };

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('budgets.monthlyBudget')}</Text>
        <View style={[styles.monthBudgetCard, { backgroundColor: colors.surface }] }>
          <Text style={{fontWeight:'600', color: colors.text}}>{t('budgets.total')}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:6}}>
            <TextInput keyboardType='numeric' value={inputBudget} onChangeText={setInputBudget} placeholder='$0' style={{flex:1,color:colors.text,borderWidth:1,borderColor:colors.border,padding:8,borderRadius:8}} placeholderTextColor={colors.icon} />
            <TouchableOpacity style={[styles.primaryButton,{marginLeft:8}]} onPress={()=>{ const v = Number(inputBudget || 0); if(v>0) setMonthlyBudget(v); }}>{<Text style={styles.primaryButtonText}>{t('budgets.set')}</Text>}</TouchableOpacity>
          </View>

          <View style={{marginTop:8}}>
            <Text style={{fontSize:20,fontWeight:'700', color: colors.text}}>${overallRemaining}</Text>
            <View style={{marginTop:8}}>
              <View style={[styles.progressTrack, { backgroundColor: theme === 'dark' ? '#0B1115' : '#F3F4F6' }]}> 
                <View style={[styles.progressFill,{width:`${Math.min(100, overallPercent)}%`, backgroundColor: (overallPercent >= 95 ? '#E53E3E' : overallPercent >= 85 ? '#F97316' : overallPercent >= 60 ? '#F59E0B' : '#10B981')}]} />
              </View>
              <Text style={{marginTop:6, color: colors.text}}>{t('budgets.percentSpent').replace('{percent}', String(overallPercent))}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('budgets.divisions')}</Text>
        <View style={{marginTop:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity style={[styles.primaryButton, {paddingHorizontal:14, paddingVertical:10, borderRadius:14, flex:1, marginRight:10}]} onPress={createDefaultDivisions}><Text style={styles.primaryButtonText}>{t('budgets.createDivisions')}</Text></TouchableOpacity>
          <View style={{width:160, flexDirection:'column'}}>
            <TouchableOpacity style={{ paddingHorizontal:12, paddingVertical:10, borderRadius:14, backgroundColor: colors.surface, borderWidth:1, borderColor: colors.border, marginBottom:8, alignItems:'center' }} onPress={()=>setDivisionOpen(true)}><Text style={{ color: colors.text, fontWeight:'700' }}>{t('budgets.addDivision')}</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal:12, paddingVertical:10, borderRadius:14, backgroundColor: 'transparent', borderWidth:1, borderColor: colors.border, alignItems:'center' }} onPress={()=>{
              // Clear always removes all divisions. Use "Default Divisions" button to restore basic ones.
              Alert.alert(t('common.reset') || 'Clear', t('budgets.clearConfirmation') || 'Remove all divisions?', [
                { text: t('common.cancel') || 'Cancel', style: 'cancel' },
                { text: t('common.create') || 'OK', onPress: ()=> setBudgets([]) }
              ]);
            }}><Text style={{ color: colors.text }}>{t('budgets.clearDivisions')}</Text></TouchableOpacity>
          </View>
        </View>

        {budgets && budgets.length > 0 ? (
          budgets.map((b:any)=>{
            const p = b.total > 0 ? Math.round((b.spent / b.total) * 100) : 0;
            const getProgressColor = (pct:number) => {
              if (pct >= 95) return '#E53E3E';
              if (pct >= 85) return '#F97316';
              if (pct >= 60) return '#F59E0B';
              return '#10B981';
            };
            const fillColor = getProgressColor(p);
            return (
              <TouchableOpacity key={b.id} style={[styles.budgetCard, { backgroundColor: colors.surface }]} onPress={()=>{ setDivisionEdit(b); setEditOpen(true); }}>
                <Text style={[styles.budgetIcon, { color: colors.text }]}>{b.icon}</Text>
                <View style={{flex:1}}>
                  <Text style={{fontWeight:'600', color: colors.text}}>{b.name && b.name.startsWith('categories.') ? t(b.name) : b.name}</Text>
                  <Text style={{color: colors.icon}}>${b.spent} / ${b.total}</Text>
                  <View style={[styles.progressTrack,{marginTop:6, backgroundColor: theme === 'dark' ? '#0B1115' : '#F3F4F6'}]}> 
                    <View style={[styles.progressFill,{width:`${Math.min(100,Math.round((b.spent/b.total)*100))}%`, backgroundColor: fillColor}]} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ color: colors.icon, marginTop:8 }}>{t('budgets.noDivisions')}</Text>
        )}

        <View style={{marginTop:12, flexDirection:'row', justifyContent:'flex-end'}}>
          <TouchableOpacity style={[styles.primaryButton,{backgroundColor:'#EF4444'}]} onPress={resetToZero}><Text style={styles.primaryButtonText}>{t('budgets.resetMonth')}</Text></TouchableOpacity>
        </View>
      </View>

      <Modal visible={divisionOpen} transparent animationType='slide'>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
            <Text style={{fontWeight:'700', color: colors.text}}>{t('budgets.addDivisionTitle')}</Text>
            <TextInput placeholder={t('budgets.divisionName')} value={divisionName} onChangeText={setDivisionName} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
            <TextInput placeholder={t('budgets.divisionTotal')} keyboardType='numeric' value={divisionTotal} onChangeText={setDivisionTotal} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:8}}>
              <TouchableOpacity style={{marginRight:8}} onPress={()=>setDivisionOpen(false)}><Text style={{color:colors.text}}>{t('common.cancel')}</Text></TouchableOpacity>
              <TouchableOpacity onPress={addDivision} style={[styles.primaryButton]}><Text style={styles.primaryButtonText}>{t('budgets.addDivision')}</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={editOpen && !!divisionEdit} transparent animationType='slide'>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.surface }]}> 
            <Text style={{fontWeight:'700', color: colors.text}}>{t('budgets.editDivisionTitle') || 'Edit Division'}</Text>
            <TextInput placeholder={t('budgets.divisionName')} value={divisionEdit ? (divisionEdit.name || '') : ''} onChangeText={(v)=>setDivisionEdit((d:any)=> d ? ({...d, name:v}) : d)} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
            <TextInput placeholder={t('budgets.divisionTotal')} keyboardType='numeric' value={divisionEdit ? String(divisionEdit.total || '') : ''} onChangeText={(v)=>setDivisionEdit((d:any)=> d ? ({...d, total: Number(v)}) : d)} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} placeholderTextColor={colors.icon} />
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:8}}>
              <TouchableOpacity style={{marginRight:8}} onPress={()=>{ setEditOpen(false); setDivisionEdit(null); }}><Text style={{color:colors.text}}>{t('common.cancel')}</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                if(!divisionEdit) return;
                // validate total >= spent
                if(Number(divisionEdit.total) < Number(divisionEdit.spent || 0)){
                  Alert.alert('Error', 'El tope debe ser mayor o igual a lo ya gastado');
                  return;
                }
                setBudgets((prev:any[])=> prev.map((b:any)=> b.id === divisionEdit.id ? {...b, name: divisionEdit.name, total: Number(divisionEdit.total)} : b));
                setEditOpen(false); setDivisionEdit(null);
              }} style={[styles.primaryButton]}><Text style={styles.primaryButtonText}>{t('common.create')}</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}
