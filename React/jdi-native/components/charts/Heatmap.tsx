import React, { useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Task } from '../../types';
import GlassCard from '../ui/GlassCard';

interface HeatmapProps {
    tasks: Task[];
    numDays?: number;
}

export default function Heatmap({ tasks, numDays = 365 }: HeatmapProps) {
    const cellSize = 12;
    const cellGap = 3;
    const screenWidth = Dimensions.get('window').width;

    // Calculate task counts by day
    const dailyCounts = useMemo(() => {
        const map: { [key: string]: number } = {};
        tasks.forEach(task => {
            if (task.done) {
                const key = new Date(task.registration).toISOString().split('T')[0];
                map[key] = (map[key] || 0) + 1;
            }
        });
        return map;
    }, [tasks]);

    // Generate date range
    const dateRange = useMemo(() => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - (numDays - 1));

        const dates = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().split('T')[0];
            dates.push({
                date: new Date(d),
                key,
                count: dailyCounts[key] || 0,
            });
        }
        return dates;
    }, [numDays, dailyCounts]);

    // Get color based on count
    const getColor = (count: number): string => {
        if (count === 0) return '#e2e8f0'; // slate-200
        if (count === 1) return '#bfdbfe'; // blue-200
        if (count <= 3) return '#60a5fa'; // blue-400
        return '#2563eb'; // blue-600
    };

    // Group by weeks
    const weeks = useMemo(() => {
        const weeksArray: typeof dateRange[] = [];
        let currentWeek: typeof dateRange = [];

        dateRange.forEach((day, index) => {
            currentWeek.push(day);
            if (day.date.getDay() === 6 || index === dateRange.length - 1) {
                weeksArray.push([...currentWeek]);
                currentWeek = [];
            }
        });

        return weeksArray;
    }, [dateRange]);

    const totalWidth = weeks.length * (cellSize + cellGap);
    const totalHeight = 7 * (cellSize + cellGap);

    return (
        <GlassCard className="rounded-3xl bg-white/60 p-5">
            <Text className="text-center text-lg font-bold text-slate-800 mb-1 font-sans">
                Tâches de l'année dernière
            </Text>
            <Text className="text-center text-sm text-slate-500 mb-4 font-medium">
                {dateRange.length} jours d'activité
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ width: totalWidth, height: totalHeight }}>
                    <Svg width={totalWidth} height={totalHeight}>
                        {weeks.map((week, weekIndex) =>
                            week.map((day, dayIndex) => {
                                const x = weekIndex * (cellSize + cellGap);
                                const y = day.date.getDay() * (cellSize + cellGap);

                                return (
                                    <Rect
                                        key={day.key}
                                        x={x}
                                        y={y}
                                        width={cellSize}
                                        height={cellSize}
                                        fill={getColor(day.count)}
                                        rx={4}
                                        ry={4}
                                    />
                                );
                            })
                        )}
                    </Svg>
                </View>
            </ScrollView>

            {/* Legend */}
            <View className="flex-row items-center justify-center mt-5 gap-2">
                <Text className="text-xs text-slate-500 font-medium">Moins</Text>
                <View className="flex-row gap-1.5">
                    {[0, 1, 2, 4].map(count => (
                        <View
                            key={count}
                            style={{
                                width: cellSize,
                                height: cellSize,
                                backgroundColor: getColor(count),
                                borderRadius: 4,
                            }}
                        />
                    ))}
                </View>
                <Text className="text-xs text-slate-500 font-medium">Plus</Text>
            </View>
        </GlassCard>
    );
}
