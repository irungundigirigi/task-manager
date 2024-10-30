export interface Task {
  id: string;
  created_at: string;
  updated_at: string;
  object: "task";
  user_id: string;
  task_priority: "high" | "normal" | "low";
  status_id: "open" | "in_progress" | "closed";
  subject: string;
  description: string;
  due_date: string;
}

export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  object: string;
  username: string;
  password: string;
  email: string;
  tasks: Task[];
}
export interface AppContextType {
  user_data: User;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  createTask: boolean;
  setUserCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  handleDateChange: (date: Date) => Promise<void>;
  handleRender: () => void;
  toggleUserCreate: () => void;
  todaysTasks: Task[] | undefined;
}

export interface CalendarProps {
  onDateChange: (date: Date) => void;
}
export interface TaskProps {
  task: Task;
  handleRender: () => void;
}
