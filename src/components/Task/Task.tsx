import React, { useState } from "react";
import { BiSolidStopwatch } from "react-icons/bi";
import { BiPencil, BiCheck, BiX } from "react-icons/bi";
import { calculateRemainingHours } from "../../util/util";
import "./Task.css";
import { Task } from "../../types/Task";
import { TaskProps } from "../../types/Task";

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const remainingTime = calculateRemainingHours(task);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [taskobj, setTask] = useState<Partial<Task>>({
    subject: task.subject,
    description: task.description,
    task_priority: task.task_priority,
    status_id: task.status_id,
  });

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleSave = (): void => {
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setTask({
      subject: task.subject,
      description: task.description,
      task_priority: task.task_priority,
      status_id: task.status_id,
    });
  };

  const handlePriorityChange = (): void => {
    if (isEditing) {
      setTask((prev) => ({
        ...prev,
        task_priority:
          prev.task_priority === "high"
            ? "normal"
            : prev.task_priority === "normal"
            ? "low"
            : "high",
      }));
    }
  };

  const handleProgressChange = () => {
    if (isEditing) {
      setTask((prev) => ({
        ...prev,
        status_id:
          prev.status_id === "open"
            ? "in_progress"
            : prev.status_id === "in_progress"
            ? "closed"
            : "open",
      }));
    }
  };

  const handleBodyChange = (value: string, field: string): void => {
    if (isEditing) {
      if (field === "description") {
        setTask((prev) => ({
          ...prev,
          description: value,
        }));
      } else {
        setTask((prev) => ({
          ...prev,
          subject: value,
        }));
      }
    }
    console.log(taskobj.description);
  };

  return (
    <div className="task">
      <div className="topbar">
        <div
          className={`bar ${
            taskobj.task_priority === "high"
              ? "priority-high"
              : taskobj.task_priority === "normal"
              ? "priority-normal"
              : "priority-low"
          }`}
          onClick={handlePriorityChange}
        >
          {taskobj.task_priority}
        </div>
        <div className="status" onClick={handleProgressChange}>
          {taskobj.status_id}
        </div>
        <div className="duedate">
          <BiSolidStopwatch /> {remainingTime}
        </div>
        <div className="edit-icon" onClick={handleEditToggle}>
          {isEditing ? (
            <>
              <BiCheck className="animating" onClick={handleSave} />
              <BiX onClick={handleCancel} />
            </>
          ) : (
            <BiPencil />
          )}
        </div>
      </div>
      <div className="subject">
        {isEditing ? (
          <textarea
            name="subject"
            className="subjectTextarea"
            value={taskobj.subject}
            onChange={(e) => handleBodyChange(e.target.value, "subject")}
          />
        ) : (
          taskobj.subject
        )}
      </div>
      <div className="description">
        {isEditing ? (
          <textarea
            name="description"
            className="descriptionTextarea"
            value={taskobj.description}
            onChange={(e) => handleBodyChange(e.target.value, "description")}
          />
        ) : (
          taskobj.description
        )}
      </div>
    </div>
  );
};

export default TaskCard;
