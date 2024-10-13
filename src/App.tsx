import { useEffect, useState } from "react";
import { Task, User } from "./types/Task";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./components/Task/Task";
import Calendar_ from "./components/Calendar/Calendar_";
import "./App.css";
//https://medium.com/@suvarna.kale/react-calendar-customization-4bdf89d04dbb

function App() {
  const [data, setData] = useState<Partial<User>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data/user.json");
      setData(await response.json());
    };
    fetchData();
  }, []);

  const handleDateChange = (date: Date):void => {
    setSelectedDate(date);
  };

  

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const selectedDateString = formatDateString(selectedDate);
    // Filter tasks based on the selected date
    const todaysTasks = data.tasks?.filter((task: Task) => {
      const dueDate = task.due_date.split(" ")[0]; // Extract the date part

      console.log(`due: ${dueDate}`)
    console.log(`selected: ${selectedDateString}`)
      return dueDate === selectedDateString;
    }) || [];

    
  return (
    <>
      <div className="left">
        {data.username}
        <div className="create">
          <Calendar_ onDateChange={handleDateChange}/>
          
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
    </>
  );
}

export default App;
