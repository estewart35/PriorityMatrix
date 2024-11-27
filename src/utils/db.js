import { ref, set, get, child, update } from 'firebase/database';
import { database } from '../../firebase';

// Function to save all tasks for a user
export const saveTasks = async (userId, tasks) => {
    try {
        await set(ref(database, `users/${userId}/tasks`), tasks);
    } catch (error) {
        throw new Error("Failed to save tasks.");
    }
};

// Function to fetch tasks for a user
export const fetchTasks = async (userId) => {
    try {
        const snapshot = await get(child(ref(database), `users/${userId}/tasks`));
        return snapshot.exists() ? snapshot.val() : { Q1: [], Q2: [], Q3: [], Q4: [] };
    } catch (error) {
        throw new Error("Failed to fetch tasks.");
    }
};