import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import { FaRegUserCircle } from "react-icons/fa";
import TaskCard from "./components/Task/Task";
import Calendar_ from "./components/Calendar/Calendar_";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data/user.json");
      setData(await response.json());
    };
    fetchData();
  }, []);

  const handleDateChange = async (date: Date) => {
    console.log(`handleDateChange: ${date}`);
    try {
      await setSelectedDate(date);
      console.log(`date set in state: ${selectedDate}`);
    } catch (error) {
      console.log(error);
    }
  };

  /* Filter todays tasks */
  const todaysTasks = data.tasks?.filter((task: Task) => {
    const dueDate = task.due_date.split(" ")[0];
    console.log(selectedDate);
    const selectedDateStr: string = selectedDate.toISOString().split("T")[0];
    return dueDate === selectedDateStr;
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
            <h2>Todays Tasks</h2>
            {todaysTasks?.map((task: Task) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
