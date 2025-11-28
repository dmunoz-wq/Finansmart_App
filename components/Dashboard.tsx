import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard(){
  const { transactions, resetData } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];

  const incomeTotal = transactions.filter((t:any)=> t.type==='income').reduce((s:number,t:any)=> s + Number(t.amount || 0), 0);
  const expenseTotal = transactions.filter((t:any)=> t.type==='expense').reduce((s:number,t:any)=> s + Number(t.amount || 0), 0);
  const total = incomeTotal - expenseTotal;
  const recent = transactions.slice(0,3);
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.greeting, { color: colors.icon }]}>{t('dashboard.hello')}</Text>
          <Text style={[styles.username, { color: colors.text }]}>Test</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Image source={{uri:'https://i.pravatar.cc/100'}} style={styles.avatar} />
          <TouchableOpacity onPress={resetData} style={{marginTop:6}}><Text style={{color:colors.icon,fontSize:12}}>{t('common.reset')}</Text></TouchableOpacity>
        </View>
      </View>

      <View style={[styles.balanceCard, { backgroundColor: colors.surface }]}>
        <View style={styles.balanceHeaderRow}>
          <Text style={[styles.balanceLabel, { color: colors.icon }]}>{t('dashboard.totalBalance')}</Text>
          <View style={styles.smallPill}><Text style={{color:'#fff'}}>{t('dashboard.today')}</Text></View>
        </View>
        <Text style={[styles.balanceAmount, { color: colors.text }]}>${total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</Text>
        <View style={styles.incomeExpenseRow}>
          <View style={[styles.inOutBlock, { backgroundColor: colors.surface }]}><ArrowUp color="#10B981" /><Text style={styles.inOutText}>{t('dashboard.income')}</Text><Text style={[styles.inOutAmount, { color: '#10B981' }]}>${incomeTotal}</Text></View>
          <View style={[styles.inOutBlock, { backgroundColor: colors.surface }]}><ArrowDown color="#E53E3E" /><Text style={styles.inOutText}>{t('dashboard.expense')}</Text><Text style={[styles.inOutAmount, { color: '#E53E3E' }]}>${expenseTotal}</Text></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.weeklySummary')}</Text>
        <View style={styles.barChartRow}>
          {[0,1,2,3,4,5,6].map((d,i)=>{
            const h = 40 + Math.round(Math.random()*120);
            return <View key={i} style={[styles.bar, i===6 && {backgroundColor:'#FF6B35', height:h} , {height:h}]} />
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.recentTransactions')}</Text>
          <TouchableOpacity onPress={resetData}><Text style={{color:colors.icon}}>{t('common.reset')}</Text></TouchableOpacity>
        </View>
        {recent.map((r:any)=> (
          <View key={r.id} style={styles.txRow}>
            <View style={[styles.txIcon, {backgroundColor: r.type==='income' ? '#D1FAE5' : '#FEE2E2'}]}>
              {r.type==='income' ? <ArrowUp color="#10B981" /> : <ArrowDown color="#E53E3E" />}
            </View>
            <View style={{flex:1}}>
                <Text style={[styles.txTitle, { color: colors.text }]}>{r.title}</Text>
                <Text style={[styles.txMeta, { color: colors.icon }]}>{(r.category && typeof r.category === 'string' && r.category.startsWith('categories.')) ? t(r.category) : r.category} · {(r.date && typeof r.date === 'string' && r.date.startsWith('date.')) ? t(`transactions.${r.date.replace('date.','')}`) : r.date}</Text>
            </View>
            <Text style={[styles.txAmount, r.type==='income' ? {color:'#10B981'} : {color:'#E53E3E'}]}>${r.amount}</Text>
          </View>
        ))}
        {/* removed red reset button as requested */}
      </View>
    </ScrollView>
  );
}
