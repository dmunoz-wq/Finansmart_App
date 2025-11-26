import { Colors } from '@/constants/theme';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.orange,
            animation: "shift",
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "600"
            },
            tabBarStyle: {
                position: "absolute",
                
                elevation: 0,
                shadowOpacity: 0,

                backgroundColor: "#FFFFFF",

            }

        }}>


            <Tabs.Screen
                name="dashboard/index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    )
                }}
              
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "Mi perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={24} color={color} />
                    )
                }}
               
            />

        </Tabs>
  )
}