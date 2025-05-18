import React, { useEffect, useState } from 'react';
import './StudentManagement.css';
import { FaPlus } from 'react-icons/fa';
import { getStudents } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import StudentTable from '../../../components/admin/StudentTable/StudentTable';
import AddStudentForm from '../../../components/admin/AddStudent/AddStudentForm';
function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-management">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="add-student-btn">
            <button onClick={() => setAddForm(true)}>
              <FaPlus /> Add Student
            </button>
          </div>
          <h2>Student Management</h2>
          <StudentTable students={students} />
          {addForm && <AddStudentForm setAddForm={setAddForm} setStudents={setStudents}/>}
        </>
      )}
    </div>
  );
}

export default StudentManagement;
