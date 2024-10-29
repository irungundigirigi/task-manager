import { useState, useEffect, createContext } from "react";
import { User } from "../types/Task";
import { Task } from "../types/Task";

const AppContext = createContext<any>({});

const AppProvider = ({ children }) => {
  const [user_data, setData] = useState<Partial<User>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [render, setRender] = useState<boolean>(true);
  const [createTask, setUserCreate] = useState<boolean>(true);

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

  const handleRender = () => {
    setRender(!render);
  };

  const toggleUserCreate = () => {
    setUserCreate(!createTask);
  };

  /** Adjust date to local time before converting it to ISO string */
  const adjustedDate: Date = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
  );

  const adjustedDateStr: string = adjustedDate.toISOString().split("T")[0];

  /* Filter todays tasks */
  const todaysTasks = user_data.tasks?.filter((task: Task) => {
    const dueDate = task.due_date.split("T")[0];
    return dueDate === adjustedDateStr;
  });

  return (
    <AppContext.Provider
      value={{
        user_data,
        setRender,
        selectedDate,
        createTask,
        setUserCreate,
        setSelectedDate,
        handleDateChange,
        handleRender,
        toggleUserCreate,
        todaysTasks,
        adjustedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
