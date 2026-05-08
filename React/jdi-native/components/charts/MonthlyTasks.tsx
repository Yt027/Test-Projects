import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Task } from '../../types';
import GlassCard from '../ui/GlassCard';

interface MonthlyTasksProps {
    tasks: Task[];
}

export default function MonthlyTasks({ tasks }: MonthlyTasksProps) {
    const screenWidth = Dimensions.get('window').width;

    const last30Days = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }
        return days;
    }, []);

    const dailyCounts = useMemo(() => {
        const map: { [key: string]: number } = {};
        last30Days.forEach(d => {
            const key = d.toISOString().split('T')[0];
            map[key] = 0;
        });

        tasks.forEach(task => {
            if (task.done) {
                const key = new Date(task.registration).toISOString().split('T')[0];
                if (map[key] !== undefined) map[key] += 1;
            }
        });

        return map;
    }, [tasks, last30Days]);

    const chartData = last30Days.map((d, index) => {
        const key = d.toISOString().split('T')[0];
        return {
            value: dailyCounts[key] || 0,
            label: index % 5 === 0 ? d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : '',
            dataPointText: '',
        };
    });

    const chartWidth = screenWidth - 100;

    return (
        <GlassCard className="rounded-3xl bg-white/60 p-5 overflow-hidden">
            <Text className="text-center text-lg font-bold text-slate-800 mb-1 font-sans">
                Tâches du mois dernier
            </Text>
            <Text className="text-center text-sm text-slate-500 mb-4 font-medium">
                Tendance mensuelle de votre productivité
            </Text>
            <View style={{ overflow: 'visible', width: chartWidth }}>
                <LineChart
                    data={chartData}
                    width={chartWidth}
                    height={240}
                    spacing={chartWidth / 30}
                    color="#f59e0b"
                    thickness={3}
                    initialSpacing={0}
                    noOfSections={4}
                    maxValue={Math.max(...chartData.map(d => d.value), 4)}
                    yAxisColor="#e2e8f0"
                    xAxisColor="#e2e8f0"
                    yAxisTextStyle={{ color: '#64748b', fontSize: 10, fontWeight: '600' }}
                    xAxisLabelTextStyle={{ color: '#64748b', fontSize: 10, fontWeight: '600' }}
                    hideDataPoints={false}
                    dataPointsColor="#f59e0b"
                    dataPointsRadius={4}
                    curved
                    isAnimated
                    animationDuration={1000}
                />
            </View>
        </GlassCard>
    );
}
