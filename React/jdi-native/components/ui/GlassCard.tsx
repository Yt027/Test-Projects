import React from 'react';
import { View, Platform, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
    children: React.ReactNode;
    intensity?: number;
    style?: ViewStyle;
    className?: string;
}

export default function GlassCard({ children, intensity = 50, style, className }: GlassCardProps) {
    if (Platform.OS === 'android') {
        // Android doesn't always handle BlurView well over complex gradients without specific settings,
        // but we'll try to use a semi-transparent background as fallback/support.
        return (
            <View
                className={`overflow-hidden border border-white/20 ${className}`}
                style={[styles.androidShadow, style]}
            >
                {children}
            </View>
        );
    }

    return (
        <View
            style={[styles.container, style]}
            className={`overflow-hidden border border-white/30 ${className}`}
        >
            <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
            <View className="bg-white/40 absolute inset-0" />
            <View className="z-10">{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    androidShadow: {
        elevation: 4,
    }
});
