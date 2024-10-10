import { useEffect, useState } from 'react';
import { Task } from './types/Task';
import './App.css';

function App() {
  const [data, setData] = useState<Task[]>([
    {
    "id": "cb5425f0-ed68-4336-bf6b-c2ff03c017a5",
    "created_at": "2024-07-19T05:32:02.108+00:00",
    "updated_at": "2024-07-19T12:28:57.179+00:00",
    "object": "Task",
    "user_id": "123e4567-e89b-12d3-a456-556642440000",
    "task_priority": "high",
    "status_id": "closed",
    "subject": "Define constraints on Task class",
    "description": "Define validation constraints - @NotNull, @Size in Task class.",
    "due_date": "2024-07-19T12:00:00"
  }
]);

  useEffect(() => {
    const fetchData = async () => {
      //const response = await fetch(`http://localhost:8080/api/v1/tasks`);
      //const data = await response.json();
      //setData(data.content);
    };
    fetchData();
    
  }, []);

  console.log(data)

  return (
    <>
      <ul>
        {data.map((task) => (
          <li key={task.id}>
            {task.subject}
            {task.description}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

