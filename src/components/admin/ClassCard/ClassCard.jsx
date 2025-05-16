import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classItem }) => {
    const handleUpdate = () => {

    }

    const handleDelete = () => {

    }
    return (
        <div className="class-card">
            <div className="class-card__banner">
                <img src={`/images/${classItem.image}`} alt="Class banner" className="class-card__image" />
            </div>

            <img
                src={`/images/${classItem.teacher_image}`}
                alt="Teacher avatar"
                className="class-card__avatar"
            />

            <div className="class-card__actions">
                <div className="class-card__icon" onClick={() => handleUpdate(classItem.id)}>
                    <i className="fas fa-edit"></i>
                </div>
                <div className="class-card__icon" onClick={() => handleDelete(classItem.id)}>
                    <i className="fas fa-trash-alt"></i>
                </div>
            </div>

            <div className="class-card__content">
                <h3 className="class-card__title">{classItem.name}</h3>
                <p className="class-card__teacher">{classItem.teacher_name}</p>
                <p className="class-card__description">{classItem.description}</p>
            </div>
            <hr></hr>
            <div className="class-card__footer">
                <p className="class-card__students">Total: {classItem.total_students} students</p>
            </div>
        </div>
  );
};

export default ClassCard;
