import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import { FaRegUserCircle } from "react-icons/fa";
import TaskCard from "./components/Task/Task";
import Calendar_ from "./components/Calendar/Calendar_";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<Partial<User>>({});
  const [render, setRender] = useState<boolean>(true);

  const handleRender = () => {
    setRender(!render);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/a3f9d8d3-39b3-4b65-bff0-12a0e6b7c5c3"
      );
      setData(await response.json());
    };
    fetchData();
  }, [render]);

  const handleDateChange = async (date: Date) => {
    try {
      await setSelectedDate(date);
    } catch (error) {
      console.log(error);
    }
  };

  /** Adjust date to local time before converting it to ISO string */
  const adjustedDate: Date = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  );

  const adjustedDateStr: string = adjustedDate.toISOString().split("T")[0];

  /* Filter todays tasks */
  const todaysTasks = data.tasks?.filter((task: Task) => {
    const dueDate = task.due_date.split(" ")[0];
    return dueDate === adjustedDateStr;
  });

  return (
    <div className="app">
      <div className="header">
        <div className="account">
          <FaRegUserCircle className="user-icon" />
          <span className="username">{data.username}</span>
        </div>
      </div>
      <div className="tm">
        <div className="left">
          <div className="calendar">
            <Calendar_
              todaysDate={selectedDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
        <div className="right">
          <ul>
            <h2>Tasks for {adjustedDate.toLocaleString().split(",")[0]}</h2>
            {todaysTasks?.map((task: Task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleRender={handleRender}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
