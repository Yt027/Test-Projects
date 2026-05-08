import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Check } from 'lucide-react-native';
import { getTasks } from '../../utils/storage';
import { Task } from '../../types';
import { useFocusEffect } from 'expo-router';
import ScreenBackground from '../../components/ScreenBackground';
import GlassCard from '../../components/ui/GlassCard';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HistoricScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

    const loadTasks = async () => {
        const storedTasks = await getTasks();
        const completedTasks = storedTasks
            .filter(task => task.done)
            .sort((a, b) => b.registration - a.registration);
        setTasks(completedTasks);
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupTasksByDate = () => {
        const groups: { [key: string]: Task[] } = {};

        filteredTasks.forEach(task => {
            const date = new Date(task.registration);
            const dateKey = date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(task);
        });

        return Object.entries(groups).map(([date, tasks]) => ({ date, tasks }));
    };

    const groupedTasks = groupTasksByDate();

    const getPriorityColor = (p: 1 | 2 | 3) => {
        switch (p) {
            case 3: return '#ef4444';
            case 2: return '#f59e0b';
            case 1: return '#64748b';
            default: return '#64748b';
        }
    };

    const getPriorityText = (priority: 1 | 2 | 3) => {
        switch (priority) {
            case 3: return 'Urgente';
            case 2: return 'Moyenne';
            case 1: return 'Basse';
            default: return '';
        }
    };

    return (
        <ScreenBackground>
            <View className="flex-1" style={{ paddingTop: insets.top }}>
                {/* Search Bar */}
                <View className="px-6 pt-10 pb-2">
                    <Text className="text-3xl font-bold text-slate-900 font-sans mb-4">Historique</Text>
                    <GlassCard className="rounded-2xl bg-white/60 p-1 pl-4 flex-row items-center border border-slate-200/50">
                        <Search color="#64748b" size={20} />
                        <TextInput
                            className="flex-1 ml-3 py-3 text-base text-slate-900"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Rechercher une tâche..."
                            placeholderTextColor="#94a3b8"
                        />
                    </GlassCard>
                </View>

                {/* Task List Grouped by Date */}
                <FlatList
                    data={groupedTasks}
                    keyExtractor={item => item.date}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 110, paddingTop: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View className="mb-6">
                            <View className="bg-white/40 self-start rounded-xl px-4 py-2 mb-3 border border-white/20">
                                <Text className="text-base font-bold text-slate-800 capitalize">
                                    📅 {item.date}
                                </Text>
                            </View>
                            {item.tasks.map(task => (
                                <GlassCard
                                    key={task.registration}
                                    className="rounded-2xl mb-3 bg-white/70 overflow-hidden"
                                >
                                    <View className="p-4 flex-row items-center">
                                        <View
                                            className="w-8 h-8 rounded-full bg-emerald-100 mr-3 items-center justify-center"
                                        >
                                            <Check color="#10b981" size={18} strokeWidth={3} />
                                        </View>

                                        <Text className="flex-1 text-base text-slate-600 font-medium line-through">
                                            {task.name}
                                        </Text>

                                        <View
                                            className="px-2 py-1 rounded-md bg-opacity-10"
                                            style={{ backgroundColor: getPriorityColor(task.priority) + '20' }}
                                        >
                                            <Text
                                                className="text-xs font-bold"
                                                style={{ color: getPriorityColor(task.priority) }}
                                            >
                                                {getPriorityText(task.priority)}
                                            </Text>
                                        </View>
                                    </View>
                                </GlassCard>
                            ))}
                        </View>
                    )}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20 px-4">
                            <GlassCard className="p-8 rounded-full bg-white/30 mb-4">
                                <Search size={40} color="#94a3b8" />
                            </GlassCard>
                            <Text className="text-slate-500 text-center text-lg font-semibold mb-2">
                                {searchQuery ? 'Aucune tâche trouvée' : 'Aucune tâche accomplie'}
                            </Text>
                            <Text className="text-slate-400 text-center text-sm">
                                {searchQuery
                                    ? 'Essayez un autre terme de recherche'
                                    : 'Vos tâches terminées apparaîtront ici.'}
                            </Text>
                        </View>
                    }
                />
            </View>
        </ScreenBackground>
    );
}
