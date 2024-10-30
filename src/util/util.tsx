import { Task } from "../types/Task";

const getRemainingTime = (task: Task): string => {
  const now = new Date();
  const dueDate = new Date(task.due_date);

  const differenceInMilliseconds = dueDate.getTime() - now.getTime();
  const differenceInHours = Math.max(
    0,
    Math.ceil(differenceInMilliseconds / (1000 * 60 * 60))
  );
  const days = Math.floor(differenceInHours / 24);
  const hours = differenceInHours % 24;

  return `${days} days ${hours} hours`;
};

const getTodaysTasks = (tasks: Task[] | undefined, selectedDate: Date) => {
  const eat_Date: Date = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  );
  const dateOnlyT: string = eat_Date.toISOString().split("T")[0];
  const daysTasks = tasks?.filter((task: Task) => {
    const dueDate = task.due_date.split("T")[0];
    return dueDate === dateOnlyT;
  });

  return daysTasks;
};

export { getTodaysTasks, getRemainingTime };
