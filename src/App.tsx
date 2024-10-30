import { useAppContext } from "./context/Provider";
import { Task } from "./types/Task";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import TaskCard from "./components/Task/Task";
import Calendar_ from "./components/Calendar/Calendar_";
import CreateTask from "./components/Create-Task/CreateTask";
import "./App.css";

function App() {
  const { user_data, todaysTasks, createTask, handleRender, toggleUserCreate } =
    useAppContext();

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
            <Calendar_ />
          </div>
        </div>
        <div className="right">
          <ul>
            {createTask && (
              <div onClick={toggleUserCreate}>
                <h2>
                  Create Task <BsPlus />
                </h2>
              </div>
            )}

            {!createTask && (
              <>
                <h3>Create new Task</h3>
                <CreateTask />
              </>
            )}

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
