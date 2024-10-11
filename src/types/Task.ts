export interface Task {
  id: string;
  created_at: string;
  updated_at: string;
  object: "task";
  user_id: string;
  task_priority: "high" | "normal" | "low";
  status_id: "open" | "in_progress" | "closed";
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
