import { useState, useEffect, createContext, useContext } from "react";
import { User, AppContextType } from "../types/Task";
import { getTodaysTasks } from "../util/util";

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const app_context = useContext(AppContext);

  if (!app_context) {
    throw new Error("app context not found");
  }
  return app_context;
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user_data, setData] = useState({} as User);
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

  const todaysTasks = getTodaysTasks(user_data.tasks, selectedDate);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
