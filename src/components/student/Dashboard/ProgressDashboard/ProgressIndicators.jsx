import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getAllGoal } from "../../../../services/api/StudentAPI";
import "./ProgressIndicators.css";

const ProgressIndicators = () => {
  const [goals, setGoals] = useState([]);
  const [semesterGoalProgress, setSemesterGoalProgress] = useState(0);
  const [weekGoalProgress, setWeekGoalProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user)
    if (!user || !user.token) {
      setErrorMessage("User not found. Please login again.");
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      try {
        const response = await getAllGoal();
        console.log("All goals:", response);

        if (response && response.length > 0) {
          setGoals(response);
        } else {
          setErrorMessage("No goals found.");
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
    if (goals.length > 0) {
      const completedGoals = goals.filter(goal => goal.completeStatus === "done").length;
      const totalGoals = goals.length;

      const semesterPercent = Math.round((completedGoals / totalGoals) * 100);

      const currentDate = new Date();
      const currentWeek = getWeek(currentDate);
      const weekGoals = goals.filter(goal => goal.dueDate && getWeek(new Date(goal.dueDate)) === currentWeek);

      const weekPercent = weekGoals.length > 0 
        ? Math.round((weekGoals.length / totalGoals) * 100) 
        : 0;

      setSemesterGoalProgress(semesterPercent);
      setWeekGoalProgress(weekPercent);
    }
  }, [goals]);

  const getWeek = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay / 7);
  };

  return (
    <div className="progress-container">
      {loading && <div>Loading goals...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!loading && !errorMessage && (
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
      )}
    </div>
  );
};

export default ProgressIndicators;