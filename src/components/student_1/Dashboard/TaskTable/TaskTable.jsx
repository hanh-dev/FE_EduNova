import React, { useState } from "react";
import './TaskTable.css';
import { initialTasks } from "../../../../assets/icons/sidebar";

// Function to map course names to color classes
const getCourseColorClass = (course) => {
  switch (course) {
    case "TOEIC":
      return "course-toeic";
    case "IT English":
      return "course-it-english";
    case "Speaking":
      return "course-speaking";
    default:
      return "course-default";
  }
};

const TaskTable = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const statusOptions = ["In progress", "Completed", "Cancel"];

  const handleStatusChange = (index, e) => {
    const newStatus = e.target.value;
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
  };

  return (
    <div className="task-table-wrapper">
      <h1>Course You're Taking</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Course</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item, index) => (
            <tr key={index}>
              <td>{item.task}</td>
              <td className={`course-name ${getCourseColorClass(item.course)}`}>
                {item.course}
              </td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(index, e)}
                  value={item.status}
                  className={`task-status ${
                    item.status === "In progress"
                      ? "in-progress"
                      : item.status === "Completed"
                      ? "completed"
                      : item.status === "Cancel"
                      ? "cancel"
                      : "default"
                  }`}
                >
                  {statusOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;