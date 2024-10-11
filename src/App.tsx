import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import TaskCard from "./components/Todo-item/Todo-item";
import "./App.css";

function App() {
  const [data, setData] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data/user.json");
      setData(await response.json());
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="left">{data.username}</div>

      <div className="right">
        <ul>
          {data.tasks?.map((task: Task) => {
            return <TaskCard task={task} />;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
