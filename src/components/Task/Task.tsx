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
  const [subject, setSubject] = useState<string>(task.subject);
  const [description, setDescription] = useState<string>(task.description);
  const [priority, setPriority] = useState<string>(task.task_priority);
  const [progress, setProgress] = useState<string>(task.status_id);

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
    setSubject(task.subject);
    setDescription(task.description);
    setIsEditing(false);
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
    console.log("clicked");
    if (isEditing) {
      setTask((prev) => ({
        ...prev,
        task_id:
          prev.status_id === "open"
            ? "in_progress"
            : prev.status_id === "in_progress"
            ? "closed"
            : "open",
      }));
    }
  };

  return (
    <div className="task">
      <div className="topbar">
        <div
          className={`bar ${
            priority === "high"
              ? "priority-high"
              : priority === "normal"
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
            className="subjectTextarea"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        ) : (
          subject
        )}
      </div>
      <div className="description">
        {isEditing ? (
          <textarea
            className="descriptionTextarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </div>
    </div>
  );
};

export default TaskCard;
