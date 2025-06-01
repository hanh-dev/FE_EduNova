import React, { useEffect, useMemo, useState } from 'react';
import '../student-management/StudentManagement.css';
import { getTeachers } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import TeacherTable from '../../../components/teacher/TeacherTable/TeacherTable';
import AddTeacher from '../../../components/teacher/AddTeacher/AddTeacher';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';
import './TeacherManagement.css'
import TeachersTab from '../../../components/admin/Classes/TeacherTabs';
import { getClasses } from '../../../services/api/StudentAPI';
import { FaPlus } from 'react-icons/fa';
function TeacherManagement() {
  const { keyword, setKeyword } = useOutletContext();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [classData, setClassData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const data = await getTeachers();
        const response = await getClasses();
        console.log('Class Data:', response); 
        setClassData(response);
        setTeachers(data);
        console.log('Teachers:', data.map(t => t.id));
console.log('Class teacher_ids:', response.map(c => c.teacher_id));
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const classEmpty = useMemo(() => {
  const assignedTeacherIds = new Set(
    classData
      .map(cls => Number(cls.teacher_id))
      .filter(id => !isNaN(id))
  );

  const unassignedTeachers = teachers.filter(t =>
    !assignedTeacherIds.has(Number(t.id))
  );

  return unassignedTeachers.length;
}, [teachers, classData]);
  const filteredTeachers = useMemo(() => {
    return teachers.filter(({ name = '', status = '', course = '' }) => {
      return (
        (!keyword || name.toLowerCase().includes(keyword.toLowerCase())) &&
        (!selectedStatus || status.toLowerCase() === selectedStatus.toLowerCase()) &&
        (!selectedCourse || course.toLowerCase() === selectedCourse.toLowerCase())
      );
    });
  }, [keyword, teachers, selectedStatus, selectedCourse]);

  return (
    <div className="student-management">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="teacher-header">
            <h1>Teacher Management</h1>
            <p>Your comprehensive platform for detailed teacher insights.</p>
          </div>
          <div className="add-student-btn">
            <button onClick={() => setAddForm(true)}>
              <FaPlus />
              Add new teacher
            </button>
          </div>
          <div className="tab-search-teacher">
            <div className="search-box">
              <AiOutlineSearch className="search-icon" />
              <input
                value={keyword}
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by teacher name..."
                className="search-input-teacher"
              />
            </div>

            <div className="filter-box">
              <FiFilter className="filter-icon" />
              <select className="filter-select new" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <select className="filter-select">
              <option value="">All Courses</option>
              {classData.map((className, index) => (
                <option key={index} value={className.name}>
                  {className.name}&nbsp;&nbsp;&nbsp;&nbsp;
                </option>
              ))}
            </select>
          </div>
          
          <TeachersTab 
              classeTotal={teachers.length}
              activeClasses={teachers.filter(t => (t.status || '').toLowerCase() === 'active').length}
              classEmpty={classEmpty}
          />

          <TeacherTable
            students={filteredTeachers}
            setStudents={setTeachers}
            setUpdateForm={setUpdateForm}
            setUserToEdit={setUserToEdit}
          />

          {addForm && (
            <AddTeacher
              setAddForm={setAddForm}
              setStudents={setTeachers}
            />
          )}

          {updateForm && (
            <AddTeacher
              setStudents={setTeachers}
              userToEdit={userToEdit}
              setUpdateForm={setUpdateForm}
              setAddForm={setAddForm}
            />
          )}
        </>
      )}
    </div>
  );
}

export default TeacherManagement;