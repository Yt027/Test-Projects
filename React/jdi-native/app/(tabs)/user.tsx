import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User2, Save, Download, Upload, X, ChevronRight, Settings, Info } from 'lucide-react-native';
import { getUsername, saveUsername, getTasks, saveTasks } from '../../utils/storage';
import { useFocusEffect } from 'expo-router';
import ScreenBackground from '../../components/ScreenBackground';
import GlassCard from '../../components/ui/GlassCard';
import ModernButton from '../../components/ui/ModernButton';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UserScreen() {
    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const insets = useSafeAreaInsets();

    const loadUsername = async () => {
        const storedUsername = await getUsername();
        setUsername(storedUsername);
    };

    useFocusEffect(
        useCallback(() => {
            loadUsername();
        }, [])
    );

    const handleSaveUsername = async () => {
        if (username.trim()) {
            await saveUsername(username.trim());
            setIsEditing(false);
            Alert.alert('✅ Succès', 'Nom d\'utilisateur enregistré !');
        }
    };

    const handleExportData = async () => {
        const tasks = await getTasks();
        const dataStr = JSON.stringify({ username, tasks }, null, 2);

        Alert.alert(
            '📤 Exporter les données',
            'Fonctionnalité à venir : Les données seront exportées vers un fichier JSON.',
            [{ text: 'OK' }]
        );

        console.log('Export data:', dataStr);
    };

    const handleImportData = () => {
        Alert.alert(
            '📥 Importer les données',
            'Fonctionnalité à venir : Vous pourrez importer vos données depuis un fichier JSON.',
            [{ text: 'OK' }]
        );
    };

    return (
        <ScreenBackground>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 120, paddingTop: insets.top }}
            >
                {/* Hero Section */}
                <View className="px-6 pt-10 pb-8 items-center">
                    <View
                        className="w-32 h-32 rounded-full mb-6 overflow-hidden border-4 border-white/50"
                        style={{ elevation: 10, shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
                    >
                        <LinearGradient
                            colors={['#dbeafe', '#bfdbfe']}
                            className="w-full h-full items-center justify-center"
                        >
                            <User2 color="#2563eb" size={60} strokeWidth={1.5} />
                        </LinearGradient>
                    </View>

                    {!isEditing && (
                        <>
                            <Text className="text-slate-900 text-3xl font-bold font-sans mb-1 text-center">
                                {username}
                            </Text>
                            <Text className="text-slate-500 font-medium text-center mb-6">
                                Compte Gratuit
                            </Text>
                            <ModernButton
                                title="Modifier le profil"
                                variant="outline"
                                onPress={() => setIsEditing(true)}
                                className="px-8"
                            />
                        </>
                    )}
                </View>

                <View className="px-6">
                    {/* Edit Profile Form */}
                    {isEditing && (
                        <GlassCard className="p-6 mb-6 rounded-3xl bg-white/70">
                            <Text className="text-lg font-bold text-slate-800 mb-4 font-sans">
                                ✏️ Modifier le profil
                            </Text>
                            <TextInput
                                className="bg-white/60 border border-slate-200 rounded-2xl px-4 py-4 text-base text-slate-900 mb-4"
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Votre nom"
                                placeholderTextColor="#94a3b8"
                            />
                            <View className="flex-row gap-3">
                                <ModernButton
                                    title="Enregistrer"
                                    onPress={handleSaveUsername}
                                    style={{ flex: 1 }}
                                />
                                <ModernButton
                                    title="Annuler"
                                    variant="secondary"
                                    onPress={() => {
                                        setIsEditing(false);
                                        loadUsername();
                                    }}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </GlassCard>
                    )}

                    {/* Settings Section */}
                    <Text className="text-slate-900 font-bold text-xl mb-4 px-2 font-sans">Paramètres</Text>
                    <GlassCard className="rounded-3xl bg-white/60 p-0 mb-8 overflow-hidden">
                        <TouchableOpacity
                            className="flex-row items-center p-5 border-b border-slate-100/50 active:bg-white/40 mb-[1px]"
                            onPress={handleExportData}
                        >
                            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-4">
                                <Download color="#2563eb" size={20} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-bold text-slate-800">Exporter les données</Text>
                                <Text className="text-sm text-slate-500">Sauvegarder vos tâches</Text>
                            </View>
                            <ChevronRight color="#cbd5e1" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center p-5 active:bg-white/40"
                            onPress={handleImportData}
                        >
                            <View className="w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-4">
                                <Upload color="#f59e0b" size={20} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-base font-bold text-slate-800">Importer les données</Text>
                                <Text className="text-sm text-slate-500">Restaurer vos tâches</Text>
                            </View>
                            <ChevronRight color="#cbd5e1" size={20} />
                        </TouchableOpacity>
                    </GlassCard>

                    {/* About Section */}
                    <GlassCard className="rounded-3xl bg-white/40 p-6 mb-8">
                        <View className="flex-row items-center mb-3">
                            <Info color="#64748b" size={20} className="mr-2" />
                            <Text className="text-lg font-bold text-slate-800">À propos</Text>
                        </View>

                        <Text className="text-base text-slate-700 mb-2 leading-6">
                            <Text className="font-bold text-blue-600">JDI Native</Text> est conçu pour vous aider à rester organisé avec style.
                        </Text>
                        <View className="bg-white/50 rounded-xl p-4 mt-2">
                            <Text className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Version</Text>
                            <Text className="text-sm text-slate-800 font-medium">1.0.0 (Premium Build)</Text>
                        </View>
                    </GlassCard>
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}
