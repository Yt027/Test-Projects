import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2, Target, TrendingUp, Zap, Calendar } from 'lucide-react-native';
import { getTasks, getUsername } from '../../utils/storage';
import { Task } from '../../types';
import { useFocusEffect } from 'expo-router';
import ScreenBackground from '../../components/ScreenBackground';
import GlassCard from '../../components/ui/GlassCard';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [username, setUsername] = useState('Utilisateur');
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = async () => {
    const storedUsername = await getUsername();
    const tasks: Task[] = await getTasks();

    const pending = tasks.filter(task => !task.done).length;
    const completed = tasks.filter(task => task.done).length;

    setUsername(storedUsername);
    setPendingTasks(pending);
    setCompletedTasks(completed);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const completionRate = pendingTasks + completedTasks > 0
    ? Math.round((completedTasks / (pendingTasks + completedTasks)) * 100)
    : 0;

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110, paddingTop: insets.top + 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
        }
      >
        {/* Header / Hero */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-slate-500 font-medium text-base mb-1">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Text>
              <Text className="text-slate-900 text-3xl font-bold font-sans">
                Bonjour, {username}
              </Text>
            </View>
            <View className="bg-white/80 p-2 rounded-full shadow-sm">
              <View className="bg-primary-100 p-2 rounded-full">
                <Zap color="#2563eb" size={24} fill="#2563eb" />
              </View>
            </View>
          </View>
        </View>

        {/* Highlight Card */}
        <View className="px-6 mb-8">
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, padding: 24, elevation: 8, shadowColor: '#2563eb', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white/80 font-medium text-sm">Productivité journalière</Text>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">{completionRate}%</Text>
              </View>
            </View>
            <Text className="text-white text-3xl font-bold mb-2">
              {completedTasks} tâches
            </Text>
            <Text className="text-white/90 text-sm mb-6">
              Accomplies aujourd'hui. Continuez comme ça !
            </Text>

            <View className="h-2 bg-white/20 rounded-full overflow-hidden">
              <View
                style={{ width: `${completionRate}%` }}
                className="h-full bg-accent-400 rounded-full"
              />
            </View>
          </LinearGradient>
        </View>

        <View className="px-6 pb-6">
          <Text className="text-slate-900 font-bold text-xl mb-4 font-sans">Aperçu</Text>

          <View className="flex-row gap-4">
            {/* Pending Tasks */}
            <GlassCard className="flex-1 p-5 rounded-3xl bg-white/60">
              <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mb-3">
                <Target color="#2563eb" size={20} />
              </View>
              <Text className="text-slate-500 font-medium text-sm">À faire</Text>
              <Text className="text-slate-900 text-2xl font-bold mt-1">{pendingTasks}</Text>
            </GlassCard>

            {/* Completed Tasks */}
            <GlassCard className="flex-1 p-5 rounded-3xl bg-white/60">
              <View className="bg-emerald-100 w-10 h-10 rounded-full items-center justify-center mb-3">
                <CheckCircle2 color="#10b981" size={20} />
              </View>
              <Text className="text-slate-500 font-medium text-sm">Terminées</Text>
              <Text className="text-slate-900 text-2xl font-bold mt-1">{completedTasks}</Text>
            </GlassCard>
          </View>
        </View>

        {/* Motivational Quote */}
        <View className="px-6 mb-6">
          <GlassCard className="p-6 rounded-3xl bg-white/40">
            <Text className="text-slate-700 font-medium italic text-center w-full leading-6">
              "La seule façon de faire du bon travail est d'aimer ce que vous faites."
            </Text>
            <Text className="text-slate-400 text-xs font-bold text-center mt-3 uppercase tracking-wide">
              — Steve Jobs
            </Text>
          </GlassCard>
        </View>

      </ScrollView>
    </ScreenBackground>
  );
}
