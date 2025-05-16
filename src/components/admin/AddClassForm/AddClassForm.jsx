import React, { useState } from 'react';
import './AddClassForm.css';
import { createClass, getClasses } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';

const AddClassForm = ({ onClose, teacherData, setClassData }) => {
  const [formData, setFormData] = useState({
    className: '',
    teacherName: '',
    description: '',
    image: null,
    students: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result.trim();
      const rows = text.split('\n');

      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

      const students = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim());

        const student = {};
        headers.forEach((header, index) => {
          student[header] = values[index];
        });
        return student;
      });

      setFormData(prev => ({
        ...prev,
        students: students
      }));
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createClass(formData);

      if (result.status) {
        setFormData({
          className: '',
          teacherName: '',
          description: '',
          image: null,
          students: []
        });

        const newData = await getClasses();
        setClassData(newData);
        toast.success("Class created successfully!");
      } else {
        toast.error(result.error || "Failed to create class.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log("Test error: ", error.response);

        if (status === 422 || status === 400) {
          toast.error(data.error || "Invalid data. Please check again.");
        } else if (status === 404) {
          toast.error(data.error || "Teacher not found.");
        } else {
          toast.error(data.error || "An unexpected error occurred.");
        }
      } else {
        toast.error("Unable to connect to the server.");
      }
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Class</h2>
        <form onSubmit={handleSubmit}>
          <label className='modal-label'>
            Name of Class
            <input
              type="text"
              name="className"
              value={formData.className}
              placeholder="Enter class name"
              required
              onChange={handleChange}
            />
          </label>

          <label className='modal-label'>
            Teacher
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              required
            >
              <option value="">Select teacher</option>
              {teacherData.map(teacher => (
                <option key={teacher.id} value={teacher.name}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </label>

          <label className='modal-label'>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
            />
          </label>

          <label className='modal-label'>
            Image of Class
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <label className='modal-label'>
            Upload Students (CSV)
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
            />
          </label>

          <button type="submit" className="submit-button1">Save Class</button>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;
