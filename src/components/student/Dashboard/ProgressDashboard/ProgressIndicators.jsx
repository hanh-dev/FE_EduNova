import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getAllGoal, getAllWeekGoal } from "../../../../services/api/StudentAPI";
import "./ProgressIndicators.css";

const ProgressIndicators = () => {
  const [goals, setGoals] = useState([]);
  const [weekGoals, setWeekGoals] = useState([]);
  const [semesterGoalProgress, setSemesterGoalProgress] = useState(0);
  const [weekGoalProgress, setWeekGoalProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.user_id) {
      setErrorMessage("User not found. Please login again.");
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      try {
        const response = await getAllGoal();
        const weekResponse = await getAllWeekGoal();

        if (Array.isArray(response)) {
          setGoals(response);
          if (response.length > 0) {
            setSelectedSemesterId(response[0].semester_id); 
          }
        } else {
          setErrorMessage("No semester goals found.");
        }

        if (Array.isArray(weekResponse)) {
          setWeekGoals(weekResponse);
        } else {
          setErrorMessage("No week goals found.");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setErrorMessage("Failed to load goals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  useEffect(() => {
    if (goals.length > 0 && selectedSemesterId !== null) {
      const semesterGoals = goals.filter(goal => goal.semester_id === selectedSemesterId);
      const completedGoals = semesterGoals.filter(goal => goal.completeStatus === "done").length;
      const semesterPercent = semesterGoals.length > 0
        ? Math.round((completedGoals / semesterGoals.length) * 100)
        : 0;
      setSemesterGoalProgress(semesterPercent);
    } else {
      setSemesterGoalProgress(0);
    }

    if (weekGoals.length > 0) {
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const goalsInCurrentWeek = weekGoals.filter(goal => {
        if (!goal.due_date) return false;
        const dueDateParts = goal.due_date.split("-");
        if (dueDateParts.length !== 3) return false;
        const dueDate = new Date(`${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
      });

      const completedWeekGoals = goalsInCurrentWeek.filter(goal => goal.complete_status === "done").length;
      const weekPercent = goalsInCurrentWeek.length > 0
        ? Math.round((completedWeekGoals / goalsInCurrentWeek.length) * 100)
        : 0;
      setWeekGoalProgress(weekPercent);
    } else {
      setWeekGoalProgress(0);
    }
  }, [goals, weekGoals, selectedSemesterId]);

  const semesterList = [
    ...new Map(
      goals.map(g => [
        g.semester_id, 
        g.semester_name || (g.semester ? g.semester.name : `Semester ${g.semester_id}`)
      ])
    ).entries()
  ].sort((a, b) => {
    const numA = parseInt(a[1].match(/\d+/)?.[0] || 0);
    const numB = parseInt(b[1].match(/\d+/)?.[0] || 0);
    return numA - numB;
  });

  const handleSemesterChange = (event) => {
    setSelectedSemesterId(Number(event.target.value));
  };

  return (
    <div className="progress-container">
      {loading && <div>Loading goals...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!loading && !errorMessage && (
        <>
          <div className="semester-selector">
            <select
              value={selectedSemesterId || ""}
              onChange={handleSemesterChange}
              className="semester-dropdown"
            >
              <option value="" disabled>
                Select a semester
              </option>
              {semesterList.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="progress-items-container">
            <div className="progress-item">
              <CircularProgressbar
                value={semesterGoalProgress}
                text={`${semesterGoalProgress}%`}
                styles={buildStyles({
                  pathColor: "#00aaff",
                  trailColor: "#d6d6d6"
                })}
              />
              <h3>Semester's Goal</h3>
            </div>
            <div className="progress-item">
              <CircularProgressbar
                value={weekGoalProgress}
                text={`${weekGoalProgress}%`}
                styles={buildStyles({
                  pathColor: "#ff9900",
                  trailColor: "#d6d6d6"
                })}
              />
              <h3>Week's Goal</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressIndicators;