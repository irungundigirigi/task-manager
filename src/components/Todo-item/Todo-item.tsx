import { Task } from "../../types/Task";
import "./task-item.css";

function TaskCard(props) {
  return (
    <div className="task">
      <div className="subject">
        {" "}
        {props.task.task_priority} {props.task.status_id}
      </div>
      <div className="subject"> {props.task.subject}</div>
      <div className="description"> {props.task.description}</div>
    </div>
  );
}

export default TaskCard;
