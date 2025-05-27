import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { getAllTasks, updateTaskStatus } from "../../../../services/api/StudentAPI";

const statusMap = {
  inprogress: "In progress",
  done: "Completed",
  cancel: "Cancelled",
};

const displayToDbStatus = {
  "In progress": "inprogress",
  "Completed": "done",
  "Cancelled": "cancel",
};

const getCourseColorClass = (course) => {
  switch (course) {
    case "TOEIC": return "course-toeic";
    case "IT English": return "course-it-english";
    case "Speaking": return "course-speaking";
    default: return "course-default";
  }
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        if (response.success) {
          const formatted = response.data.map((task) => ({
            id: task.id,
            task: task.lesson_summary || "No task",
            course: task.skill_module || "Unknown",
            status: task.status || "inprogress",
          }));
          setTasks(formatted);
        } else {
          setErrorMessage(response.message || "Failed to load tasks.");
        }
      } catch (err) {
        setErrorMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (index, event) => {
    const newDisplay = event.target.value;
    const newDbStatus = displayToDbStatus[newDisplay];
    const taskId = tasks[index].id;

    try {
      await updateTaskStatus(taskId, { status: newDbStatus });
      setTasks((prev) => {
        const updated = [...prev];
        updated[index].status = newDbStatus;
        return updated;
      });
    } catch (err) {
      alert("Failed to update task status.");
    }
  };

  return (
    <div className="task-table-wrapper">
      <h1>Courses You're Taking</h1>
      {loading && <div>Loading tasks...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!loading && !errorMessage && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td className={`course-name ${getCourseColorClass(item.course)}`}>
                    {item.course}
                  </td>
                  <td>
                    <select
                      value={statusMap[item.status]}
                      onChange={(e) => handleStatusChange(index, e)}
                      className={`task-status ${item.status}`}
                    >
                      {Object.values(statusMap).map((label) => (
                        <option key={label} value={label}>{label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">No tasks available.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskTable;