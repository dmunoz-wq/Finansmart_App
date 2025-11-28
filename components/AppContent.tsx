import styles, { createStyles } from '@/components/finansmartStyles';
import { useGlobalContext } from '@/context/GlobalContext';
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
  const isDark = theme === 'dark';
  const themeStyles = createStyles(isDark);
  const [active, setActive] = useState<'Home'|'Transactions'|'Budgets'|'Profile'>('Home');
  const [modalOpen, setModalOpen] = useState(false);
  const liftAnim = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(liftAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  },[]);

  return (
    <View style={styles.appWrapper}>
      <View style={styles.appBody}>
        {active === 'Home' && <Dashboard />}
        {active === 'Transactions' && <Transactions />}
        {active === 'Budgets' && <Budgets />}
        {active === 'Profile' && <Profile />}
      </View>

      <View style={[themeStyles.tabBar]}>
        <TabButton icon={<Home size={20} />} label='Inicio' active={active==='Home'} onPress={()=>setActive('Home')} />
        <TabButton icon={<CreditCard size={20} />} label='Movimientos' active={active==='Transactions'} onPress={()=>setActive('Transactions')} />
        <View style={{width:72}} />
        <TabButton icon={<PieChart size={20} />} label='Presup.' active={active==='Budgets'} onPress={()=>setActive('Budgets')} />
        <TabButton icon={<User size={20} />} label='Perfil' active={active==='Profile'} onPress={()=>setActive('Profile')} />
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
