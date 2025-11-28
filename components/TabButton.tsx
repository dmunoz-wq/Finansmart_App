import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useGlobalContext } from '@/context/GlobalContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TabButton({ icon, label, active, onPress }:{icon:React.ReactNode,label:string,active:boolean,onPress:()=>void}){
  const { theme } = useGlobalContext();
  const colors = Colors[theme];

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <View style={styles.tabIcon}>{icon}</View>
      <Text style={[styles.tabLabel, { color: active ? colors.tabIconSelected : colors.tabIconDefault }]}>{label}</Text>
    </TouchableOpacity>
  );
}
