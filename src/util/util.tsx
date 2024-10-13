import { Task } from "../types/Task";

export function calculateRemainingHours(task: Task): string {
    const now = new Date();
    const dueDate = new Date(task.due_date);

    const differenceInMilliseconds = dueDate.getTime() - now.getTime();
    const differenceInHours = Math.max(0, Math.ceil(differenceInMilliseconds / (1000 * 60 * 60))); // Use Math.max to avoid negative hours
    const days = Math.floor(differenceInHours / 24);
    const hours = differenceInHours % 24;

    return `${days} days ${hours} hours`;
}

