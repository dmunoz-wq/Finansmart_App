import { Colors } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Text, View } from 'react-native';


export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: Colors.orange,
                headerTitle: 'FinanSmart',
                headerTitleStyle: {
                    color: 'white'
                },
                headerStyle: {
                    backgroundColor: Colors.darkGray
                },
                headerTintColor: "white"
            }}
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>

                    {/* ---- HEADER DEL DRAWER ---- */}
                    <View
                        style={{
                            alignItems: 'center',
                            paddingVertical: 30,
                            borderBottomWidth: 1,
                            borderColor: '#eee',
                            marginBottom: 20,
                        }}
                    >


                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            FinansMart
                        </Text>
                    </View>

                    {/* ---- BOTÓN ÚNICO ---- */}
                    <DrawerItem
                        icon={() => (
                            <MaterialIcons name="logout" size={24} color="black" />
                        )}
                        label="Cerrar Sesión"
                        onPress={() => router.navigate('/auth/login')}
                    />

                </DrawerContentScrollView>
            )}
        />
    );
}
