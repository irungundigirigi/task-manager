import React, { useState, useContext, SyntheticEvent } from "react";
import "./Create_Task.css";
import { AppContext } from "../../context/Provider";

const CreateTask: React.FC = () => {
  const { handleRender, toggleUserCreate } = useContext(AppContext);
  const initialState = {
    user_id: "a3f9d8d3-39b3-4b65-bff0-12a0e6b7c5c3",
    due_date: "",
    status_id: "open",
    task_priority: "",
    subject: "",
    description: "",
  };
  const [formDetails, setFormDetails] = useState(initialState);
  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/tasks", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formDetails),
      });
      handleRender();
      if (response.status == 200) {
        toggleUserCreate();
        setFormDetails(initialState);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="form">
        <label>
          {" "}
          Due Date
          <input
            value={formDetails.due_date}
            type="datetime-local"
            onChange={(e) =>
              setFormDetails({ ...formDetails, due_date: e.target.value })
            }
          />
        </label>
        <label>
          Task priority
          <select
            name="Task_priority"
            onChange={(e) =>
              setFormDetails({ ...formDetails, task_priority: e.target.value })
            }
          >
            <option value="">Select task priority</option>
            <option value="high">high</option>
            <option value="normal">normal</option>
            <option value="low">low</option>
          </select>
        </label>
        <label>
          Subject
          <input
            value={formDetails.subject}
            name="subject"
            onChange={(e) =>
              setFormDetails({ ...formDetails, subject: e.target.value })
            }
          />
        </label>
        <label>
          Description
          <input
            name="description"
            value={formDetails.description}
            onChange={(e) =>
              setFormDetails({ ...formDetails, description: e.target.value })
            }
          />
        </label>
        <button onClick={handleFormSubmit} className="btn">
          Create task
        </button>
      </form>
    </>
  );
};

export default CreateTask;
