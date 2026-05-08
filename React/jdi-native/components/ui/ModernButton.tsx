import React from 'react';
import { Text, TouchableOpacity, ViewStyle, Animated, Platform, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

interface ModernButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline';
    icon?: React.ReactNode;
    style?: ViewStyle;
    className?: string;
    disabled?: boolean;
}

export default function ModernButton({
    title,
    onPress,
    variant = 'primary',
    icon,
    style,
    className,
    disabled = false
}: ModernButtonProps) {
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        if (disabled) return;
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
    };

    const getColors = () => {
        switch (variant) {
            case 'secondary':
                return ['#64748b', '#475569'];
            case 'accent':
                return ['#fbbf24', '#f59e0b'];
            case 'outline':
                return ['transparent', 'transparent'];
            case 'primary':
            default:
                return ['#3b82f6', '#2563eb'];
        }
    };

    const colors = getColors();
    const isOutline = variant === 'outline';

    if (isOutline) {
        return (
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                activeOpacity={0.8}
            >
                <Animated.View
                    style={[{ transform: [{ scale: scaleValue }], ...style }]}
                    className={`flex-row items-center justify-center px-6 py-3.5 rounded-2xl border-2 border-primary-500 ${disabled ? 'opacity-50' : ''} ${className}`}
                >
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className="text-primary-600 font-semibold text-base">{title}</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            activeOpacity={0.9}
        >
            <Animated.View style={[{ transform: [{ scale: scaleValue }], ...style }]}>
                <LinearGradient
                    colors={colors as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className={`flex-row items-center justify-center px-6 py-4 rounded-2xl shadow-blue ${disabled ? 'opacity-50' : ''} ${className}`}
                >
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={`text-white font-bold text-base ${variant === 'accent' ? 'text-slate-900' : ''}`}>
                        {title}
                    </Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
}
