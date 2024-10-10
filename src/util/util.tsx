import { Task } from "../types/Task";

export function calculateRemainingTime(task:Task) {
    const now = new Date();
    const n = Date.parse(now)
    const dueDate = Date.parse(task.due_date);
    const timeDifference = dueDate - now;
    const remainingHours = timeDifference / (1000 * 60 * 60);
    return remainingHours > 0 ? remainingHours.toFixed(2) : 0; // If time is past, return 0
  }