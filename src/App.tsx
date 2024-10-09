import { useEffect, useState } from 'react'
import { Task } from './types/Task';
import './App.css'

function App() {

  const [data, setData] = useState({});

  useEffect (() => {

    const fetchData = async() => {
      const response = await fetch(`http://localhost:8080/api/v1/tasks`);
      const data = await response.json();
      setData(data.content)
    }
    fetchData()
  },[])

  return (
    <>
    <ul>
    {data.map((task) => {
      <li key={task.id}>
        {task.subject}
        {task.description}

      </li>
    })}
    </ul>
    </>
  )
}

export default App
