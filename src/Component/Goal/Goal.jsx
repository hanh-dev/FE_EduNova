import React from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Goal.css";

function Goal() {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/your-goal'); // Điều hướng đến trang YourGoal
  };

  return (
    <div className="container mt-4">
      <div className="search mb-3">
        <button className="btn btn-secondary">Search</button>
      </div>

      <div className="content d-flex">
        {/* Menu */}
        <div className="left_content me-3">
          {Array(6)
            .fill("Noidungmenu")
            .map((item, index) => (
              <div className="noidung" key={index}>
                {item}
              </div>
            ))}
        </div>

        {/* Right content */}
        <div className="right-content w-100">
          {/* Row 1 */}
          <div className="row">
            <div className="col-6 mb-5">
              <div className="goal-card">
                <div className="goal-text">
                  <h4>Your goals this semester</h4>
                  {/* Nút View sẽ điều hướng đến trang YourGoal */}
                  <button
                    className="btn btn-primary goal-button"
                    onClick={handleViewClick}
                  >
                    View
                  </button>
                </div>

                <div>
                  <img
                    src="/src/assets/image/goal.png"
                    alt="target"
                    className="goal-image"
                  />
                </div>
              </div>
            </div>

            <div className="col-6 mb-5">
              <div className="goal-card">
                <div className="goal-text">
                  <h4>Your goals this semester</h4>
                  {/* Nút View điều hướng đến trang YourGoal */}
                  <button
                    className="btn btn-primary goal-button"
                    onClick={handleViewClick}
                  >
                    View
                  </button>
                </div>

                <div>
                  <img
                    src="/src/assets/image/goal.png"
                    alt="target"
                    className="goal-image"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-6 mb-5">
              <div className="goal-card">
                <div className="goal-text">
                  <h4>Your goals this semester</h4>
                  {/* Nút View điều hướng đến trang YourGoal */}
                  <button
                    className="btn btn-primary goal-button"
                    onClick={handleViewClick}
                  >
                    View
                  </button>
                </div>

                <div>
                  <img
                    src="/src/assets/image/goal.png"
                    alt="target"
                    className="goal-image"
                  />
                </div>
              </div>
            </div>

            <div className="col-6 mb-5">
              <div className="goal-card">
                <div className="goal-text">
                  <h4>Your goals this semester</h4>
                  {/* Nút View điều hướng đến trang YourGoal */}
                  <button
                    className="btn btn-primary goal-button"
                    onClick={handleViewClick}
                  >
                    View
                  </button>
                </div>

                <div>
                  <img
                    src="/src/assets/image/goal.png"
                    alt="target"
                    className="goal-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goal;
