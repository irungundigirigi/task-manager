import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import { AiOutlinePlus } from "react-icons/ai";
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
      <div className="left">
        {data.username}
        <div className="create">
          {" "}
          Create Task <AiOutlinePlus />
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
