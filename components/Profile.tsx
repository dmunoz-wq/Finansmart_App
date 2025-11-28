import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useGlobalContext } from '@/context/GlobalContext';
import { ChevronRight, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Profile(){
  const { theme, setTheme, lang, setLang } = useGlobalContext();
  const colors = Colors[theme];

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.profileHeader}>
        <View style={[styles.profileAvatar, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }]}>
          <User color={colors.text} size={32} />
        </View>
        <View>
          <Text style={[{fontWeight:'700',fontSize:18, color: colors.text}]}>Luz Mery</Text>
          <Text style={{color: colors.icon}}>luz@example.com</Text>
          <View style={styles.proBadge}><Text style={{color:'#fff'}}>Pro Member</Text></View>
        </View>
      </View>

      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}> 
        <View style={styles.settingsRow}><Text style={{ color: colors.text }}>Modo Oscuro</Text><Switch value={theme==='dark'} onValueChange={v=>setTheme(v ? 'dark' : 'light')} /></View>
        <View style={styles.settingsRow}><Text style={{ color: colors.text }}>Idioma</Text><View style={{flexDirection:'row',alignItems:'center'}}><Text style={{marginRight:8, color: colors.text}}>{lang==='es'?'Español':'English'}</Text><Switch value={lang==='en'} onValueChange={v=>setLang(v ? 'en' : 'es')} /></View></View>
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }] }>
        <TouchableOpacity style={[styles.menuRow, { borderBottomColor: colors.border }]}><Text style={{ color: colors.text }}>Cuenta</Text><ChevronRight /></TouchableOpacity>
        <TouchableOpacity style={[styles.menuRow, { borderBottomColor: colors.border }]}><Text style={{ color: colors.text }}>Notificaciones</Text><ChevronRight /></TouchableOpacity>
        <TouchableOpacity style={styles.menuRow}><Text style={{ color: colors.text }}>Soporte</Text><ChevronRight /></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
