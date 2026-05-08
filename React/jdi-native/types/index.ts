export interface Task {
    name: string;
    priority: 1 | 2 | 3; // 1: Low, 2: Medium, 3: Urgent
    done: boolean;
    registration: number; // timestamp
}

export type Priority = 1 | 2 | 3;

export interface ChartDataPoint {
    date: string;
    count: number;
}

export interface DailyCount {
    [key: string]: number;
}
