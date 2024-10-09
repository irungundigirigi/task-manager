export interface Task {
    id: number,
    created_at: String,
    updated_at: String,
    object: String,
    user_id: String,
    task_priority: String,
    status_id: String,
    subject :String,
    description: String,
    due_date: String
}