import React, { useEffect, useMemo, useState } from 'react';
import '../teacher-management/TeacherManagement.css'
import { getStudents } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import StudentTable from '../../../components/admin/StudentTable/StudentTable';
import AddStudentForm from '../../../components/admin/AddStudent/AddStudentForm';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';
import TeacherTabs from '../../../components/admin/TeacherTabs/TeacherTabs';

function StudentManagement() {
  const { keyword, setKeyword } = useOutletContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

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

  const filteredStudents = useMemo(() => {
    return students.filter(({ name = '', status = '' }) => {
      return (
        (!keyword || name.toLowerCase().includes(keyword.toLowerCase())) &&
        (!selectedStatus || status.toLowerCase() === selectedStatus.toLowerCase())
      );
    });
  }, [keyword, selectedStatus, students]);

  return (
    <div className="student-management">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="teacher-header">
            <h1>Student Management</h1>
            <p>Manage your students effectively with search and filter options.</p>
          </div>

          <div className="add-student-btn">
            <button onClick={() => setAddForm(true)}>
              <FaPlus />
              Add new student
            </button>
          </div>

          <div className="tab-search-teacher">
            <div className="search-box">
              <AiOutlineSearch className="search-icon" />
              <input
                value={keyword}
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by student name..."
                className="search-input-teacher"
              />
            </div>

            <div className="filter-box">
              <FiFilter className="filter-icon" />
              <select
                className="filter-select new"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Tabs Section */}
          <TeacherTabs
            total={students.length}
            active={students.filter(s => (s.status || '').toLowerCase() === 'active').length}
            inactive={students.filter(s => (s.status || '').toLowerCase() === 'inactive').length}
          />

          {/* Table Section */}
          <StudentTable
            students={filteredStudents}
            setStudents={setStudents}
            setUpdateForm={setUpdateForm}
            setUserToEdit={setUserToEdit}
          />

          {/* Modals */}
          {addForm && (
            <AddStudentForm
              setAddForm={setAddForm}
              setStudents={setStudents}
            />
          )}

          {updateForm && (
            <AddStudentForm
              setStudents={setStudents}
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

export default StudentManagement;