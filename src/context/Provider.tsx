import { useState, useEffect, createContext } from "react";
import { User } from "../types/Task";
import { Task } from "../types/Task";

const AppContext = createContext<any>({});

const AppProvider = ({ children }) => {
  const [user_data, c_setData] = useState<Partial<User>>({});
  const [c_selectedDate, c_setSelectedDate] = useState<Date>(new Date());
  const [c_render, c_setRender] = useState<boolean>(true);
  const [c_createTask, c_setUserCreate] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/a3f9d8d3-39b3-4b65-bff0-12a0e6b7c5c3"
      );
      c_setData(await response.json());
    };
    fetchData();
  }, [c_render]);

  const c_handleDateChange = async (date: Date) => {
    try {
      await c_setSelectedDate(date);
    } catch (error) {
      console.log(error);
    }
  };

  const c_handleRender = () => {
    c_setRender(!c_render);
  };

  const c_toggleUserCreate = () => {
    c_setUserCreate(!c_createTask);
  };

  /** Adjust date to local time before converting it to ISO string */
  const adjustedDate: Date = new Date(
    c_selectedDate.getTime() - c_selectedDate.getTimezoneOffset() * 60000
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
        c_setRender,
        c_selectedDate,
        c_createTask,
        c_setUserCreate,
        c_setSelectedDate,
        c_handleDateChange,
        c_handleRender,
        c_toggleUserCreate,
        todaysTasks,
        adjustedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
