import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classItem }) => {
  return (
        <div className="class-card">
            <div className="class-card__banner">
                <img src={classItem.imageUrl} alt="Class banner" className="class-card__image" />
            </div>

            <img
                src={classItem.avatarUrl}
                alt="Teacher avatar"
                className="class-card__avatar"
            />

            <div className="class-card__content">
                <h3 className="class-card__title">{classItem.name}</h3>
                <p className="class-card__teacher">{classItem.teacher}</p>
                <p className="class-card__description">{classItem.description}</p>
            </div>
            <hr></hr>
            <div className="class-card__footer">
                <p className="class-card__students">Total: {classItem.total} students</p>
            </div>
        </div>

  );
};

export default ClassCard;
