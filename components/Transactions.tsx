import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import { ArrowDown, ArrowUp, Filter } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Transactions(){
  const { transactions } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [query, setQuery] = useState('');

  const grouped:any = transactions.reduce((acc:any, t:any)=>{
    acc[t.dateGroup] = acc[t.dateGroup] || [];
    acc[t.dateGroup].push(t);
    return acc;
  },{});
  const { t } = useTranslation();

  function translateIfKey(v:string){
    if(!v) return v;
    if(typeof v !== 'string') return v;
    if(v.startsWith('categories.')) return t(v);
    if(v.startsWith('date.')) return t(`transactions.${v.replace('date.','')}`) || t(v.replace('date.',''));
    return v;
  }

  return (
    <View style={styles.pageInner}>
      <View style={styles.stickyRow}>
        <TextInput placeholder={t('transactions.search')} value={query} onChangeText={setQuery} placeholderTextColor={colors.icon} style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} />
        <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.surface }]}><Filter color={colors.icon} /></TouchableOpacity>
      </View>

      <ScrollView>
        {Object.keys(grouped).map(group => (
          <View key={group} style={styles.txGroup}>
            <Text style={[styles.groupTitle, { color: colors.text }]}>{group}</Text>
            {grouped[group].map((t:any)=> (
              <View key={t.id} style={styles.txRow}>
                <View style={[styles.txIcon, {backgroundColor: t.type==='income' ? '#D1FAE5' : '#FEE2E2'}]}>
                  {t.type==='income' ? <ArrowUp color="#10B981" /> : <ArrowDown color="#E53E3E" />}
                </View>
                <View style={{flex:1}}>
                    <Text style={[styles.txTitle, { color: colors.text }]}>{t.title}</Text>
                    <Text style={[styles.txMeta, { color: colors.icon }]}>{translateIfKey(t.category)} · {translateIfKey(t.date)}</Text>
                </View>
                <Text style={[styles.txAmount, t.type==='income' ? {color:'#10B981'} : {color:'#E53E3E'}]}>${t.amount}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
