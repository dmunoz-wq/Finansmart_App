import { createStyles, styles } from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { ArrowDown, ArrowUp, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function Dashboard(){
  const { transactions } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const isDark = theme === 'dark';
  const themeStyles = createStyles(isDark);

  const incomes = transactions.reduce((s:number,t:any)=> t.type==='income' ? s + Number(t.amount) : s, 0);
  const expenses = transactions.reduce((s:number,t:any)=> t.type==='expense' ? s + Number(t.amount) : s, 0);
  const total = incomes - expenses;
  const recent = transactions.slice(0,3);

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.greeting, { color: colors.icon }]}>Hola,</Text>
          <Text style={[styles.username, { color: colors.text }]}>Luz Mery</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.border, justifyContent: 'center', alignItems: 'center' }]}>
          <User color={colors.icon} size={24} />
        </View>
      </View>

      <View style={[themeStyles.balanceCard]}>
        <View style={styles.balanceHeaderRow}>
          <Text style={[styles.balanceLabel, { color: colors.icon }]}>Balance Total</Text>
          <View style={styles.smallPill}><Text style={{color:'#fff'}}>Hoy</Text></View>
        </View>
        <Text style={[themeStyles.balanceAmount, { color: colors.text }]}>${total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
        <View style={styles.incomeExpenseRow}>
          <View style={[themeStyles.inOutBlock]}>
            <ArrowUp color="#10B981" />
            <Text style={[styles.inOutText, { color: colors.text }]}>Ingresos</Text>
            <Text style={[themeStyles.inOutAmount]}>${incomes.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
          </View>
          <View style={[themeStyles.inOutBlock]}>
            <ArrowDown color="#6B7280" />
            <Text style={[styles.inOutText, { color: colors.text }]}>Gastos</Text>
            <Text style={[themeStyles.inOutAmount]}>${expenses.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Resumen Semanal</Text>
        <View style={styles.barChartRow}>
          {['Lun','Mar','Mié','Jue','Vie','Sab','Dom'].map((day,i)=>{
            const h = 40 + Math.round(Math.random()*120);
            return <View key={i} style={{alignItems:'center'}}><View style={[styles.bar, i===6 && {backgroundColor:'#FF6B35', height:h} , {height:h}]} /><Text style={{marginTop:4, fontSize:10, color: colors.icon, fontWeight:'500'}}>{day}</Text></View>
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Transacciones Recientes</Text>
        {recent.map((r:any)=> (
          <View key={r.id} style={styles.txRow}>
            <View style={[styles.txIcon, {backgroundColor: r.type==='income' ? '#D1FAE5' : '#F3F4F6'}]}>
              {r.type==='income' ? <ArrowUp color="#10B981" /> : <ArrowDown color="#6B7280" />}
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.txTitle, { color: colors.text }]}>{r.title}</Text>
              <Text style={[styles.txMeta, { color: colors.icon }]}>{r.category} · {r.date}</Text>
            </View>
            <Text style={[styles.txAmount, r.type==='income' ? {color:'#10B981'} : {color:'#6B7280'}]}>${r.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
