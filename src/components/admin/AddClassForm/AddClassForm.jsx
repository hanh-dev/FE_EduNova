import React, { useState } from 'react';
import './AddClassForm.css';

const AddClassForm = ({ onClose, teacherData }) => {
  const [csvData, setCsvData] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const rows = text.split('\n').map((row) => row.split(','));
      setCsvData(rows);
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CSV Data:', csvData);
  };

  return (
<div className="modal-overlay">
  <div className="modal">
    <button className="close-button" onClick={onClose}>×</button>
    <h2>Add New Class</h2>
    <form onSubmit={handleSubmit}>
      <label className='modal-label'>
        Name of Class
        <input type="text" name="name" placeholder="Enter class name" required />
      </label>

    <select name="teacherId">
      {teacherData.map(teacher => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.name}
        </option>
      ))}
    </select>

      <label className='modal-label'>
        Description
        <textarea name="description" placeholder="Enter description" rows="3" />
      </label>

      <label className='modal-label'>
        Image of Class
        <input type="file" accept="image/*" />
      </label>

      <label className='modal-label'>
        Upload Students (CSV)
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
      </label>

      <button type="submit" className="submit-button">Save Class</button>
    </form>
  </div>
</div>

  );
};

export default AddClassForm;
