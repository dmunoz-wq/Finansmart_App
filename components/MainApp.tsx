import styles from '@/components/finansmartStyles';
import { useGlobalContext } from '@/context/GlobalContext';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import AppContent from './AppContent';
import AuthScreen from './AuthScreen';
import Onboarding from './Onboarding';

export default function MainApp(){
  const { theme } = useGlobalContext();
  const colors = (require('@/constants/theme').Colors as any)[theme];

  const [onboardStep, setOnboardStep] = useState(0);
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState<'login'|'signup'>('login');

  const { width, height } = Dimensions.get('window');
  const mockupWidth = Math.min(400, Math.max(320, Math.floor(width - 24)));
  const mockupHeight = Math.min(850, Math.max(520, Math.floor(height - 40)));

  return (
    <SafeAreaView style={[styles.safe, theme === 'dark' ? styles.bgDark : styles.bgLight]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <View style={[styles.deviceMockup, Platform.OS !== 'web' ? { width: mockupWidth, height: mockupHeight, borderRadius: 18 } : {}, { backgroundColor: colors.background }]}>
        {onboardStep < 2 && !authed ? (
          <Onboarding step={onboardStep} setStep={setOnboardStep} setAuthed={setAuthed} />
        ) : !authed ? (
          <AuthScreen authMode={authMode} setAuthMode={setAuthMode} onAuth={() => setAuthed(true)} />
        ) : (
          <AppContent />
        )}
      </View>
    </SafeAreaView>
  );
}
