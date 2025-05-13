import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressIndicators.css";

const ProgressIndicators = () => {
  return (
    <div className="progress-container">
      <div className="progress-item">
        <CircularProgressbar
          value={25}
          text="25%"
          styles={buildStyles({ pathColor: "#00aaff", trailColor: "#d6d6d6" })}
        />
        <h3>Semester's Goal</h3>
      </div>
      <div className="progress-item">
        <CircularProgressbar
          value={50}
          text="50%"
          styles={buildStyles({ pathColor: "#ff9900", trailColor: "#d6d6d6" })}
        />
        <h3>Week's Goal</h3>
      </div>
    </div>
  );
};

export default ProgressIndicators;