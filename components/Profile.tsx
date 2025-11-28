import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppDataContext';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import React from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Profile(){
  const { theme, setTheme, lang, setLang } = useGlobalContext();
  const colors = Colors[theme];
  const { t } = useTranslation();
  const { resetToZero, setTransactions } = useApp();

  return (
    <ScrollView contentContainerStyle={styles.pageScroll}>
      <View style={styles.profileHeader}>
        <Image source={{uri:'https://i.pravatar.cc/120'}} style={styles.profileAvatar} />
        <View>
          <Text style={[{fontWeight:'700',fontSize:18, color: colors.text}]}>{'Test'}</Text>
          <Text style={{color: colors.icon}}>luz@example.com</Text>
          <View style={styles.proBadge}><Text style={{color:'#fff'}}>{t('profile.proMember')}</Text></View>
          <TouchableOpacity style={{marginTop:8}} onPress={()=>{
            Alert.alert(t('profile.resetTotals') || 'Reset Totals', 'Esta acción pondrá los valores totales a 0 (transacciones y presupuestos). ¿Deseas continuar?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Confirmar', onPress: ()=>{ setTransactions([]); resetToZero(); } }
            ]);
          }}>
            <Text style={{color:'#EF4444', fontWeight:'700'}}>{t('profile.resetTotals') || 'Reset Totals'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.settingsSection, { backgroundColor: colors.surface }]}> 
        <View style={styles.settingsRow}>
          <Text style={[{ color: colors.text }, styles.menuText]}>{theme === 'dark' ? '🌙 Modo oscuro' : '☀️ Modo claro'}</Text>
          <Switch value={theme==='dark'} onValueChange={v=>setTheme(v ? 'dark' : 'light')} />
        </View>
        <View style={styles.settingsRow}><Text style={[{ color: colors.text }, styles.menuText]}>{t('profile.language')}</Text><View style={{flexDirection:'row',alignItems:'center'}}><Text style={[{marginRight:8, color: colors.text}, styles.menuText]}>{lang==='es'?'Español':'English'}</Text><Switch value={lang==='en'} onValueChange={v=>setLang(v ? 'en' : 'es')} /></View></View>
      </View>

      {/* Account / Notifications / Support removed as requested */}
    </ScrollView>
  );
}
