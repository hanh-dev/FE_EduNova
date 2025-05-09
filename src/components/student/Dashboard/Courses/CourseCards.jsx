import React from "react";
import "./CourseCards.css";
import { courses } from "../../../../assets/icons/sidebar";

const CourseCards = () => {
  return (
    <div className="p-4">
      <div className="course-header">
        <h2 className="font-semibold text-lg">Courses</h2>
      </div>
      <div className="course">
        {courses.map((c, i) => (
          <div
            key={i}
            className={`course-card p-4 rounded-xl shadow ${c.color}`}
          >
            <div
              className="card-top"
              style={{
                backgroundImage: `url(${c.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h4 className="font-bold text-lg">{c.title}</h4>
              <p className="teacher-name text-sm text-gray-600">{c.teacher}</p>
            </div>
            <div className="card-bottom">
              <div className="avatar-placeholder">
                <img
                  src="../../../../../src/assets/image/avatarcourse.png"
                  alt="Avatar"
                />
              </div>
              <p className="course-desc text-sm">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCards;