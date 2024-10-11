import { Task } from "../../types/Task";
import "./task-item.css";

function TaskCard(props) {
  return (
    <div className="task">
      <div className="topbar">
        <div className="bar">{props.task.task_priority} </div>
        <div>{props.task.status_id}</div>
      </div>
      <div className="subject"> {props.task.subject}</div>
      <div className="description"> {props.task.description}</div>
      <div className="duedate">Due: {props.task.due_date}</div>
    </div>
  );
}

export default TaskCard;
