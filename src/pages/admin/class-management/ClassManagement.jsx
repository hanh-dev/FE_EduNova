import React, { useEffect, useState } from 'react'
import ClassCard from '../../../components/admin/ClassCard/ClassCard';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import AddClassForm from '../../../components/admin/AddClassForm/AddClassForm';
import './ClassManagement.css'
import { getClasses, getNameOfTeachers } from '../../../services/api/StudentAPI';

function ClassManagement() {
  const [showAddClassForm, setAddClassForm] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState([]);

  const handleAddClick = () => {
    setAddClassForm(true);
  }

  useEffect(() => {
    const handleGetClassesData = async () => {
      try {
        setLoading(true);
        const response = await getClasses();
        setClassData(response);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setClassData([]);
      } finally {
        setLoading(false);
      }
    };

    const handleTest = async() => {
      try {
        const teachers = await getNameOfTeachers();
        console.log("Test teacher name of state: ", teachers);
        setTeacher(teachers);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    handleGetClassesData();
    handleTest();
  }, []);

  return (
    <div className="main-wrapper">
    {/* Loading */}
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className='wrapper-header'>
            <button onClick={handleAddClick}>
              <img src={add} alt="Add Icon" className="button-icon" />
              Add new class
            </button>
            <h1>Class Management</h1>
          </div>

          {showAddClassForm && <AddClassForm onClose={() => setAddClassForm(false)} teacherData={teacher}/>}

          <div className="card-grid">
            {classData.map((classItem, index) => (
              <ClassCard key={index} classItem={classItem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ClassManagement