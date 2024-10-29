import { useEffect, useState, useContext } from "react";
import { AppContext } from "./context/Provider";
import { Task, User } from "./types/Task";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import TaskCard from "./components/Task/Task";
import Calendar_ from "./components/Calendar/Calendar_";
import CreateTask from "./components/Create-Task/CreateTask";
import "./App.css";

function App() {
  const {
    user_data,
    //c_setRender,
    c_selectedDate,
    c_createTask,
    // c_setUserCreate,
    // c_setSelectedDate,
    c_handleDateChange,
    c_handleRender,
    c_toggleUserCreate,
  } = useContext(AppContext);

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
    <div className="app">
      <div className="header">
        <div className="account">
          <FaRegUserCircle className="user-icon" />
          <span className="username">{user_data.username}</span>
        </div>
      </div>
      <div className="tm">
        <div className="left">
          <div className="calendar">
            <Calendar_
              todaysDate={c_selectedDate}
              onDateChange={c_handleDateChange}
            />
          </div>
        </div>
        <div className="right">
          <ul>
            {c_createTask && (
              <div onClick={c_toggleUserCreate}>
                <h2>
                  Create Task <BsPlus />
                </h2>
              </div>
            )}

            {!c_createTask && (
              <>
                <h3>Create new Task</h3>
                <CreateTask
                  toggleCreateUser={c_toggleUserCreate}
                  handleRender={c_handleRender}
                />
              </>
            )}
            <h2>Tasks for {adjustedDate.toLocaleString().split(",")[0]}</h2>
            {todaysTasks?.map((task: Task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  handleRender={c_handleRender}
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
