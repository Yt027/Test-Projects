import React from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, StyleSheet } from 'react-native';
import { LayoutDashboard, CalendarCheck, History, ChartNoAxesColumn, User2 } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const primaryColor = '#2563eb';
  const accentColor = '#f59e0b';
  const inactiveColor = '#94a3b8';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'transparent',
          borderRadius: 25,
          height: 65,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          paddingTop: 0, // Ensure no padding pushes icons down
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill} className="rounded-3xl overflow-hidden border border-white/20" />
          ) : (
            <View className="absolute inset-0 bg-white/90 rounded-3xl border border-white/20 shadow-lg" />
          )
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-primary-50' : ''}`}>
              <LayoutDashboard
                color={focused ? primaryColor : color}
                size={size || 24}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Tâches',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-accent-50' : ''}`}>
              <CalendarCheck
                color={focused ? accentColor : color}
                size={size || 24}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="historic"
        options={{
          title: 'Historique',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-primary-50' : ''}`}>
              <History
                color={focused ? primaryColor : color}
                size={size || 24}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-accent-50' : ''}`}>
              <ChartNoAxesColumn
                color={focused ? accentColor : color}
                size={size || 24}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size, focused }) => (
            <View className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-primary-50' : ''}`}>
              <User2
                color={focused ? primaryColor : color}
                size={size || 24}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
