import React, { useState } from "react";
import { BiSolidStopwatch } from "react-icons/bi";
import { BiPencil, BiCheck, BiX } from "react-icons/bi";
import { calculateRemainingHours } from "../../util/util";
import "./Task.css";
import { TaskProps } from "../../types/Task";

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const remainingTime = calculateRemainingHours(task);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>(task.subject);
  const [description, setDescription] = useState<string>(task.description);
  const [priority, setPriority] = useState<string>(task.task_priority);
  const [progress, setProgress] = useState<string>(task.status_id);

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
      setPriority((prevPriority) => {
        if (prevPriority === "high") return "normal";
        if (prevPriority === "normal") return "low";
        return "high";
      });
    }
  };

  const handleProgressChange = () => {
    if (isEditing) {
      setProgress((prevProgress) => {
        if (prevProgress === "in_progress") return "closed";
        if (prevProgress === "open") return "in_progress";
        return "open";
      });
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
          {priority}
        </div>
        <div className="status" onClick={handleProgressChange}>
          {progress}
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
