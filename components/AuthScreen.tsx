import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { useGlobalContext } from '@/context/GlobalContext';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthScreen({ authMode, setAuthMode, onAuth }:{authMode:'login'|'signup',setAuthMode:any,onAuth:any}){
  const { theme } = useGlobalContext();
  const colors = Colors[theme];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.authTitle, { color: colors.text }]}>FinanSmart</Text>
      <View style={styles.authToggleRow}>
        <TouchableOpacity onPress={() => setAuthMode('login')} style={[styles.authTab, authMode==='login' && styles.authTabActive]}><Text style={{ color: colors.text }}>Iniciar Sesión</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setAuthMode('signup')} style={[styles.authTab, authMode==='signup' && styles.authTabActive]}><Text style={{ color: colors.text }}>Registrarse</Text></TouchableOpacity>
      </View>

      <View style={styles.authForm}>
        <TextInput value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor={colors.icon} style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} autoCapitalize='none' keyboardType='email-address' />
        <View style={styles.passwordRow}>
          <TextInput value={password} onChangeText={setPassword} placeholder='Contraseña' placeholderTextColor={colors.icon} style={[styles.input, {flex:1, backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} secureTextEntry={!visible} />
          <TouchableOpacity onPress={() => setVisible(v => !v)} style={styles.eyeButton}>{visible ? <Eye size={18} color={colors.icon} /> : <EyeOff size={18} color={colors.icon} />}</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onAuth} style={styles.primaryButton}><Text style={styles.primaryButtonText}>{authMode==='login' ? 'Entrar' : 'Crear cuenta'}</Text></TouchableOpacity>
      </View>
    </View>
  );
}
