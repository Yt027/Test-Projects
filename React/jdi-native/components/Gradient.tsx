import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

interface GradientProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    children?: React.ReactNode;
    className?: string;
    style?: any;
}

export default function Gradient({ colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, children, className, style }: GradientProps) {
    if (Platform.OS === 'web') {
        // Pour le web, utiliser un style CSS avec background-image
        const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;
        const gradientStyle = {
            backgroundImage: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
        };

        return (
            <View className={className} style={[gradientStyle, style]}>
                {children}
            </View>
        );
    }

    // Pour mobile, utiliser ExpoLinearGradient
    return (
        <ExpoLinearGradient
            colors={colors as unknown as readonly [string, string, ...string[]]}
            start={start}
            end={end}
            style={style}
        >
            <View className={className}>
                {children}
            </View>
        </ExpoLinearGradient>
    );
}
