import React, { useEffect, useState } from "react";
import "./TabFilter.css";
import { getAllGoal, getGoalsByStatus } from "../../../services/api/StudentAPI";

const TabFilter = () => {
  const [totalGoals, setTotalGoals] = useState(0);
  const [doneGoals, setDoneGoals] = useState([]);
  const [doingGoals, setDoingGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allGoals = await getAllGoal();
        setTotalGoals(allGoals.length);

        const done = await getGoalsByStatus("done");
        setDoneGoals(done);

        const doing = await getGoalsByStatus("doing");
        setDoingGoals(doing);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tab-container">
      <h2 className="tab-title">
        <span className="title">
          Your Study Goal
        </span>
      </h2>
      <div className="tab-grid">
        <div className="tab-card">
          <div className="tab-icon-container ">
            <span className="icon ">
              <i class="fas fa-bullseye"></i>
            </span>
          </div>
          <div>
            <p className="tab-label">Total</p>
            <p className="tab-number">{totalGoals}</p>
            <p>All your study goals</p>
          </div>
        </div>

        <div className="tab-card">
          <div className="tab-icon-container">
            <span className="icon ">
              <i class="fas fa-check-square"></i>
            </span>
          </div>
          <div>
            <p className="tab-label">Complete</p>
            <p className="tab-number">{doneGoals.length}</p>
            <p>Goals you have finished</p>
          </div>
        </div>

        <div className="tab-card">
          <div className="tab-icon-container">
            <span className="icon">
              <i class="fas fa-chart-line"></i>
            </span>
          </div>
          <div>
            <p className="tab-label">Progress</p>
            <p className="tab-number">{doingGoals.length}</p>
            <p>Goals in progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabFilter;
