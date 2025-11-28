import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Transactions(){
  const { transactions, deleteTransaction } = useApp();
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [query, setQuery] = useState('');

  const grouped:any = transactions.reduce((acc:any, t:any)=>{
    acc[t.dateGroup] = acc[t.dateGroup] || [];
    acc[t.dateGroup].push(t);
    return acc;
  },{});

  // Filter transactions based on query
  const filteredTransactions = query.trim() === '' 
    ? transactions 
    : transactions.filter((t:any) => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.note.toLowerCase().includes(query.toLowerCase()) ||
        String(t.amount).includes(query)
      );

  const filteredGrouped:any = filteredTransactions.reduce((acc:any, t:any)=>{
    acc[t.dateGroup] = acc[t.dateGroup] || [];
    acc[t.dateGroup].push(t);
    return acc;
  },{});

  return (
    <View style={styles.pageInner}>
      <View style={styles.stickyRow}>
        <TextInput placeholder='Buscar por título, categoría o monto' value={query} onChangeText={setQuery} placeholderTextColor={colors.icon} style={[styles.searchInput, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text, flex: 1 }]} />
      </View>

      <ScrollView>
        {Object.keys(filteredGrouped).length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: colors.icon, fontSize: 16 }}>No se encontraron transacciones</Text>
          </View>
        ) : (
          Object.keys(filteredGrouped).map(group => (
            <View key={group} style={styles.txGroup}>
              <Text style={[styles.groupTitle, { color: colors.text }]}>{group}</Text>
              {filteredGrouped[group].map((t:any)=> (
                <View key={t.id} style={styles.txRow}>
                  <View style={[styles.txIcon, {backgroundColor: t.type==='income' ? '#D1FAE5' : '#FEE2E2'}]}>
                    {t.type==='income' ? <ArrowUp color="#10B981" /> : <ArrowDown color="#E53E3E" />}
                  </View>
                  <View style={{flex:1}}>
                    <Text style={[styles.txTitle, { color: colors.text }]}>{t.title}</Text>
                    <Text style={[styles.txMeta, { color: colors.icon }]}>{t.category} · {t.date}</Text>
                  </View>
                  <Text style={[styles.txAmount, t.type==='income' ? {color:'#10B981'} : {color:'#6B7280'}]}>${t.amount}</Text>
                  <TouchableOpacity onPress={() => deleteTransaction(t.id)} style={{ marginLeft: 12, padding: 8 }}>
                    <Trash2 color="#E53E3E" size={20} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
