import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthScreen({ authMode, setAuthMode, onAuth }:{authMode:'login'|'signup',setAuthMode:any,onAuth:any}){
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.authTitle, { color: colors.text }]}>FinanSmart</Text>
      <View style={styles.authToggleRow}>
        <TouchableOpacity onPress={() => setAuthMode('login')} style={[styles.authTab, authMode==='login' && styles.authTabActive]}><Text style={{ color: colors.text }}>{t('auth.login')}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setAuthMode('signup')} style={[styles.authTab, authMode==='signup' && styles.authTabActive]}><Text style={{ color: colors.text }}>{t('auth.signup')}</Text></TouchableOpacity>
      </View>

      <View style={styles.authForm}>
        <TextInput value={email} onChangeText={setEmail} placeholder={t('auth.emailPlaceholder')} placeholderTextColor={colors.icon} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} autoCapitalize='none' keyboardType='email-address' />
        <View style={styles.passwordRow}>
          <TextInput value={password} onChangeText={setPassword} placeholder={t('auth.passwordPlaceholder')} placeholderTextColor={colors.icon} style={[styles.input, {flex:1, backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} secureTextEntry={!visible} />
          <TouchableOpacity onPress={() => setVisible(v => !v)} style={styles.eyeButton}>{visible ? <Eye size={18} color={colors.icon} /> : <EyeOff size={18} color={colors.icon} />}</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onAuth} style={styles.primaryButton}><Text style={styles.primaryButtonText}>{authMode==='login' ? t('auth.enter') : t('auth.createAccount')}</Text></TouchableOpacity>
      </View>
    </View>
  );
}
