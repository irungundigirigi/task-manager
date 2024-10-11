import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./components/Todo-item/Todo-item";
import Calendar from "react-calendar";
import "./App.css";
//https://medium.com/@suvarna.kale/react-calendar-customization-4bdf89d04dbb

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
      <div className="left">
        {data.username}
        <div className="create">
          {" "}
          Create Task <AiOutlinePlus />
          <Calendar />
        </div>
      </div>

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
