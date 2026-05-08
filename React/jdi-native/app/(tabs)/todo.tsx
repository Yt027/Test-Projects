import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Trash2, Plus, Check } from 'lucide-react-native';
import { getTasks, saveTasks } from '../../utils/storage';
import { Task, Priority } from '../../types';
import { useFocusEffect } from 'expo-router';
import ScreenBackground from '../../components/ScreenBackground';
import GlassCard from '../../components/ui/GlassCard';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TodoScreen() {
    const [input, setInput] = useState('');
    const [priority, setPriority] = useState<Priority>(2);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<0 | Priority>(0);
    const insets = useSafeAreaInsets();

    const loadTasks = async () => {
        const storedTasks = await getTasks();
        setTasks(storedTasks);
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const addTask = async () => {
        if (!input.trim()) return;

        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        const newTask: Task = {
            name: input.trim(),
            priority: priority,
            done: false,
            registration: Date.now(),
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await saveTasks(updatedTasks);
        setInput('');
        setPriority(2);
    };

    const toggleTask = async (id: number) => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        const updatedTasks = tasks.map(task =>
            task.registration === id ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);
        await saveTasks(updatedTasks);
    };

    const removeTask = (id: number) => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        Alert.alert(
            'Supprimer la tâche',
            'Êtes-vous sûr de vouloir supprimer cette tâche ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        const updatedTasks = tasks.filter(task => task.registration !== id);
                        setTasks(updatedTasks);
                        await saveTasks(updatedTasks);
                    },
                },
            ]
        );
    };

    const todaysTasks = tasks.filter(task => {
        const taskDate = new Date(task.registration);
        const today = new Date();
        return (
            (taskDate.getDate() === today.getDate() &&
                taskDate.getMonth() === today.getMonth() &&
                taskDate.getFullYear() === today.getFullYear()) ||
            !task.done
        );
    });

    const filteredTasks = todaysTasks.filter(task =>
        filter === 0 || task.priority === filter
    );

    const getPriorityColor = (p: Priority) => {
        switch (p) {
            case 3: return '#ef4444'; // Red
            case 2: return '#f59e0b'; // Amber
            case 1: return '#64748b'; // Slate
            default: return '#64748b';
        }
    };

    const getPriorityText = (p: Priority) => {
        switch (p) {
            case 3: return 'Urgente';
            case 2: return 'Moyenne';
            case 1: return 'Basse';
            default: return '';
        }
    };

    return (
        <ScreenBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <View className="flex-1" style={{ paddingTop: insets.top }}>
                    {/* Header */}
                    <View className="px-6 pt-10 pb-2">
                        <Text className="text-3xl font-bold text-slate-900 font-sans mb-1">Tâches</Text>
                        <Text className="text-slate-500 font-medium">{filteredTasks.length} tâches pour aujourd'hui</Text>
                    </View>

                    {/* Filter Pills */}
                    <View className="px-6 py-4">
                        <View className="flex-row gap-2">
                            {[
                                { value: 0, label: 'Tout' },
                                { value: 3, label: 'Urgente' },
                                { value: 2, label: 'Moyenne' },
                                { value: 1, label: 'Basse' },
                            ].map(({ value, label }) => {
                                const isActive = filter === value;
                                return (
                                    <TouchableOpacity
                                        key={value}
                                        onPress={() => {
                                            if (Platform.OS !== 'web') Haptics.selectionAsync();
                                            setFilter(value as 0 | Priority);
                                        }}
                                        className={`px-4 py-2 rounded-full border ${isActive ? 'bg-primary-600 border-primary-600' : 'bg-white/50 border-slate-200'}`}
                                    >
                                        <Text className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-600'}`}>
                                            {label}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>

                    {/* Task List */}
                    <FlatList
                        data={filteredTasks}
                        keyExtractor={item => item.registration.toString()}
                        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120, paddingTop: 8, gap: 12 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <GlassCard className="rounded-2xl bg-white/70 p-0 overflow-hidden">
                                <View className="flex-row items-center">
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => toggleTask(item.registration)}
                                        className="flex-1 flex-row items-center p-4"
                                    >
                                        <View
                                            className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}
                                        >
                                            {item.done && <Check size={14} color="white" strokeWidth={3} />}
                                        </View>

                                        <View className="flex-1 mr-2">
                                            <Text className={`text-base font-medium ${item.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View
                                            className="px-2 py-1 rounded-md bg-opacity-10"
                                            style={{ backgroundColor: getPriorityColor(item.priority) + '20' }}
                                        >
                                            <Text
                                                className="text-xs font-bold"
                                                style={{ color: getPriorityColor(item.priority) }}
                                            >
                                                {getPriorityText(item.priority)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => removeTask(item.registration)}
                                        className="p-4 pl-2"
                                    >
                                        <Trash2 size={20} color="#ef4444" />
                                    </TouchableOpacity>
                                </View>
                            </GlassCard>
                        )}
                        ListEmptyComponent={
                            <View className="items-center justify-center py-20 px-10">
                                <View className="bg-slate-100 p-6 rounded-full mb-4">
                                    <Check size={40} color="#94a3b8" />
                                </View>
                                <Text className="text-slate-500 text-center text-lg font-medium mb-1">
                                    Tout est calme
                                </Text>
                                <Text className="text-slate-400 text-center text-sm">
                                    Aucune tâche à afficher pour le moment.
                                </Text>
                            </View>
                        }
                    />
                </View>

                {/* Input Area (Bottom) */}
                <GlassCard className="absolute bottom-[90px] left-4 right-4 rounded-3xl p-2 bg-white/90 shadow-strong">
                    <View className="flex-row items-center gap-2 pl-2">
                        {/* Priority Selector (Mini) */}
                        <TouchableOpacity
                            onPress={() => {
                                const next = priority === 1 ? 2 : priority === 2 ? 3 : 1;
                                setPriority(next as Priority);
                                if (Platform.OS !== 'web') Haptics.selectionAsync();
                            }}
                            className="w-8 h-8 rounded-full items-center justify-center"
                            style={{ backgroundColor: getPriorityColor(priority) }}
                        >
                            <Text className="text-white font-bold text-xs">
                                {priority === 3 ? '!!!' : priority === 2 ? '!!' : '!'}
                            </Text>
                        </TouchableOpacity>

                        <TextInput
                            className="flex-1 py-3 text-base text-slate-900 font-medium"
                            placeholder="Nouvelle tâche..."
                            placeholderTextColor="#94a3b8"
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={addTask}
                        />

                        <TouchableOpacity
                            onPress={addTask}
                            className={`p-3 rounded-2xl ${input.trim() ? 'bg-primary-600' : 'bg-slate-200'}`}
                            disabled={!input.trim()}
                        >
                            <Plus size={24} color={input.trim() ? 'white' : '#94a3b8'} />
                        </TouchableOpacity>
                    </View>
                </GlassCard>
            </KeyboardAvoidingView>
        </ScreenBackground>
    );
}
