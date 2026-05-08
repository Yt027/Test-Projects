import React, { useState, useCallback } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { getTasks } from '../../utils/storage';
import { Task } from '../../types';
import { useFocusEffect } from 'expo-router';
import Heatmap from '../../components/charts/Heatmap';
import Histogram from '../../components/charts/Histogram';
import MonthlyTasks from '../../components/charts/MonthlyTasks';
import ScreenBackground from '../../components/ScreenBackground';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function StatsScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const insets = useSafeAreaInsets();

    const loadTasks = async () => {
        const storedTasks = await getTasks();
        setTasks(storedTasks);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    return (
        <ScreenBackground>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120, paddingTop: insets.top }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
                }
            >
                <View className="px-6 pt-10 pb-2">
                    <Text className="text-3xl font-bold text-slate-900 font-sans mb-1">Statistiques</Text>
                    <Text className="text-slate-500 font-medium">Vos progrès en chiffres</Text>
                </View>

                <View className="px-6 gap-6 pt-4">
                    <Heatmap tasks={tasks} />
                    <Histogram tasks={tasks} />
                    <MonthlyTasks tasks={tasks} />
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}
