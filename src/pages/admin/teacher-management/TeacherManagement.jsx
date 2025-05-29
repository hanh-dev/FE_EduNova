import React, { useEffect, useMemo, useState } from 'react';
import '../student-management/StudentManagement.css'
import { getTeachers } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import StudentTable from '../../../components/admin/StudentTable/StudentTable';
import AddStudentForm from '../../../components/admin/AddStudent/AddStudentForm';
import AddTeacher from '../../../components/teacher/AddTeacher/AddTeacher';
import TeacherTable from '../../../components/teacher/TeacherTable/TeacherTable';
import { useOutletContext } from 'react-router-dom';
function TeacherManagement() {
  const { keyword } = useOutletContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getTeachers();
        console.log("Test teachers: ", students);
        setStudents(students);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudent = useMemo(() => {
    if(!keyword) return students;

    return students.filter(student => student.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [keyword, students]);

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
              <img src={add} alt="Add Icon" className="button-icon" />
              Add new teacher
            </button>
          </div>
          <h2>Teacher Management</h2>
          <TeacherTable students={filteredStudent} setStudents={setStudents} setUpdateForm={setUpdateForm} setUserToEdit={setUserToEdit}/>
          {addForm && <AddTeacher setAddForm={setAddForm} setStudents={setStudents}/>}
          {updateForm && <AddTeacher setStudents={setStudents} userToEdit={userToEdit} setUpdateForm={setUpdateForm} setAddForm={setAddForm}/>}
        </>
      )}
    </div>
  );
}

export default TeacherManagement;