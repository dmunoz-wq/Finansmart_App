import styles from '@/components/finansmartStyles';
import { useGlobalContext } from '@/context/GlobalContext';
import useTranslation from '@/hooks/useTranslation';
import { CreditCard, Home, PieChart, Plus, User } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import AddTransactionModal from './AddTransactionModal';
import Budgets from './Budgets';
import Dashboard from './Dashboard';
import Profile from './Profile';
import TabButton from './TabButton';
import Transactions from './Transactions';

export default function AppContent(){
  const { theme } = useGlobalContext();
  const [active, setActive] = useState<'Home'|'Transactions'|'Budgets'|'Profile'>('Home');
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const liftAnim = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(liftAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  },[]);

  const colors = (require('@/constants/theme').Colors as any)[theme];

  return (
    <View style={styles.appWrapper}>
      <View style={styles.appBody}>
        {active === 'Home' && <Dashboard />}
        {active === 'Transactions' && <Transactions />}
        {active === 'Budgets' && <Budgets />}
        {active === 'Profile' && <Profile />}
      </View>

      <View style={[styles.tabBar, { backgroundColor: colors.surface, borderColor: colors.border }] }>
        <TabButton icon={<Home size={20} />} label={t('tabs.home')} active={active==='Home'} onPress={()=>setActive('Home')} />
        <TabButton icon={<CreditCard size={20} />} label={t('tabs.transactions')} active={active==='Transactions'} onPress={()=>setActive('Transactions')} />
        <View style={{width:72}} />
        <TabButton icon={<PieChart size={20} />} label={t('tabs.budgets')} active={active==='Budgets'} onPress={()=>setActive('Budgets')} />
        <TabButton icon={<User size={20} />} label={t('tabs.profile')} active={active==='Profile'} onPress={()=>setActive('Profile')} />
      </View>

      <Animated.View style={[styles.fabWrap, { transform: [{ translateY: liftAnim.interpolate({ inputRange:[0,1], outputRange:[30,0] }) }] }] }>
        <TouchableOpacity style={styles.fab} onPress={()=>setModalOpen(true)}>
          {/* Plus icon kept hex white for accent */}
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <AddTransactionModal visible={modalOpen} onClose={()=>setModalOpen(false)} />
    </View>
  );
}
