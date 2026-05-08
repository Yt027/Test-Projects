import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const TASKS_KEY = '@jdi_tasks';
const USERNAME_KEY = '@jdi_username';

export const getTasks = async (): Promise<Task[]> => {
    try {
        const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
        return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
};

export const getUsername = async (): Promise<string> => {
    try {
        const username = await AsyncStorage.getItem(USERNAME_KEY);
        return username || 'Utilisateur';
    } catch (error) {
        console.error('Error loading username:', error);
        return 'Utilisateur';
    }
};

export const saveUsername = async (username: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(USERNAME_KEY, username);
    } catch (error) {
        console.error('Error saving username:', error);
    }
};
