// src/components/AnnouncementModal.jsx
import React from "react";
import "./AnnouncementModal.css";

const AnnouncementModal = ({ isOpen, onClose, classData, announcement, setAnnouncement, handleSubmit }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setAnnouncement((prev) => ({
      ...prev,
      [e.target.name] :  e.target.value
    }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Create Announcement</h2>
          <p>Publish a new announcement to students</p>
        </div>

        <div className="modal-body">
          <label>Title *</label>
          <input name="title" type="text" placeholder="Enter announcement title" value={announcement.title} onChange={(e) => handleChange(e)}/>

          <label>Content *</label>
          <textarea name="content" placeholder="Enter announcement content" value={announcement.content} onChange={(e) => handleChange(e)}></textarea>

          <div className="modal-row">
            <div>
              <label>Priority</label>
              <select name="priority" value={announcement.priority} onChange={(e) => handleChange(e)}>
                <option>High</option>
                <option selected>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label>Type</label>
              <select name="type" value={announcement.type} onChange={(e) => handleChange(e)}>
                <option selected>Warning</option>
                <option >Info</option>
              </select>
            </div>

            <div>
              <label>Target Audience</label>
              <select name="target_type" value={announcement.target_type} onChange={(e) => handleChange(e)}>
                <option>All Students</option>
                {classData.map((cls, index) => (
                  <option key={index} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="publish-btn" onClick={handleSubmit}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
