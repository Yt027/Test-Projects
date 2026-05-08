import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Task } from '../../types';
import GlassCard from '../ui/GlassCard';

interface HistogramProps {
    tasks: Task[];
}

export default function Histogram({ tasks }: HistogramProps) {
    const screenWidth = Dimensions.get('window').width;

    const last7Days = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }
        return days;
    }, []);

    const dataByDay = useMemo(() => {
        const counts: { [key: string]: number } = {};
        last7Days.forEach(d => {
            const key = d.toISOString().split('T')[0];
            counts[key] = 0;
        });

        tasks.forEach(task => {
            if (task.done) {
                const key = new Date(task.registration).toISOString().split('T')[0];
                if (counts.hasOwnProperty(key)) {
                    counts[key] += 1;
                }
            }
        });

        return counts;
    }, [tasks, last7Days]);

    const chartData = last7Days.map(d => {
        const key = d.toISOString().split('T')[0];
        const label = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        return {
            value: dataByDay[key] || 0,
            label: label.charAt(0).toUpperCase() + label.slice(1, 3),
            frontColor: '#3b82f6',
            gradientColor: '#2563eb',
        };
    });

    const chartWidth = screenWidth - 100;

    return (
        <GlassCard className="rounded-3xl bg-white/60 p-5 overflow-hidden">
            <Text className="text-center text-lg font-bold text-slate-800 mb-1 font-sans">
                Tâches des 7 derniers jours
            </Text>
            <Text className="text-center text-sm text-slate-500 mb-4 font-medium">
                Votre productivité hebdomadaire
            </Text>
            <View style={{ overflow: 'visible', width: chartWidth }}>
                <BarChart
                    data={chartData}
                    width={chartWidth}
                    height={220}
                    barWidth={(chartWidth / 7) - 12}
                    spacing={12}
                    roundedTop
                    roundedBottom
                    hideRules
                    xAxisThickness={0}
                    yAxisThickness={0}
                    yAxisTextStyle={{ color: '#64748b', fontSize: 12, fontWeight: '600' }}
                    xAxisLabelTextStyle={{ color: '#64748b', fontSize: 12, fontWeight: '600' }}
                    noOfSections={4}
                    maxValue={Math.max(...chartData.map(d => d.value), 4)}
                    isAnimated
                    animationDuration={800}
                    showGradient
                />
            </View>
        </GlassCard>
    );
}
