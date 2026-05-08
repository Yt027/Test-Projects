import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenBackgroundProps {
    children: React.ReactNode;
}

export default function ScreenBackground({ children }: ScreenBackgroundProps) {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background gradient: very subtle off-white to light gray/blue
                colors={['#f8fafc', '#eff6ff', '#e2e8f0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            {/* Decorative ambient blobs */}
            <View style={[styles.blob, styles.blob1]} />
            <View style={[styles.blob, styles.blob2]} />

            {children}
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    blob: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        opacity: 0.4,
    },
    blob1: {
        top: -100,
        left: -100,
        backgroundColor: '#dbeafe', // light blue
        transform: [{ scale: 1.2 }],
    },
    blob2: {
        bottom: -100,
        right: -100,
        backgroundColor: '#fef3c7', // light amber
        transform: [{ scale: 1.5 }],
    },
});
