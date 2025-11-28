import styles from '@/components/finansmartStyles';
import { Colors } from '@/constants/theme';
import { Bell, Wallet } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding({ step, setStep, setAuthed }:{step:number,setStep:any,setAuthed:any}){
  // Use GlobalContext inside to get theme
  const theme = (require('@/context/GlobalContext').useGlobalContext as any)().theme as 'light'|'dark';
  const setTheme = (require('@/context/GlobalContext').useGlobalContext as any)().setTheme as any;
  const colors = Colors[theme];

  const pages = [
    { title: 'Bienvenido a FinanSmart', desc: 'Gestiona tus finanzas personales de forma simple y elegante.' },
    { title: 'Alertas y Presupuestos', desc: 'Controla tus gastos y recibe alertas cuando te acerques al límite.' },
  ];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topRightToggle}>
        <TouchableOpacity onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={[styles.themeButton, { backgroundColor: colors.surface }]}>
          <Text style={[styles.themeText, { color: colors.text }]}>{theme === 'dark' ? '🌙' : '☀️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.onboardCenter}>
        <Text style={[styles.onboardTitle, { color: colors.text }]}>{pages[step].title}</Text>
        <Text style={[styles.onboardDesc, { color: colors.icon }]}>{pages[step].desc}</Text>
        <View style={styles.onboardIconWrapper}>
          {step === 0 ? <Wallet size={64} color="#FF6B35" /> : <Bell size={64} color="#FF6B35" />}
        </View>
      </View>

      <View style={styles.onboardFooter}>
        <View style={styles.stepIndicatorRow}>
          <View style={[styles.stepDot, step===0 && styles.stepDotActive, { backgroundColor: colors.border }]} />
          <View style={[styles.stepDot, step===1 && styles.stepDotActive, { backgroundColor: colors.border }]} />
        </View>
        <View style={styles.onboardButtonsRow}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.ghostButton}><Text style={{ color: colors.text }}>Saltar</Text></TouchableOpacity>
          {step < pages.length -1 ? (
            <TouchableOpacity onPress={() => setStep((s:number) => s+1)} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Siguiente</Text></TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setAuthed(true)} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Comenzar</Text></TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
