import React, { useEffect, useMemo, useState } from 'react';
import ClassCard from '../../../components/admin/ClassCard/ClassCard';
import { PulseLoader } from 'react-spinners';
import AddClassForm from '../../../components/admin/AddClassForm/AddClassForm';
import './ClassManagement.css';
import { getClasses, getNameOfTeachers, getStudents } from '../../../services/api/StudentAPI';
import { useOutletContext } from 'react-router-dom';
import ClassNavigation from '../../../components/admin/Classes/ClassNavigation';
import AnalyticNavigation from '../../../components/admin/Classes/AnalyticNavigation';
import AnnouncementNavigation from '../../../components/admin/Classes/AnnouncementNavigation';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';


function ClassManagement() {
  const { keyword } = useOutletContext();
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('classes');
  const { classeTotal, activeClasses, classEmpty, setKeyword } = useOutletContext();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'classes':
        return <ClassNavigation classeTotal={classeTotal} activeClasses={activeClasses} classEmpty={classEmpty}/>
      case 'announcements':
        return <AnnouncementNavigation />
      case 'analytics':
        return <AnalyticNavigation />
      default:
        return <ClassNavigation />
    }
  }

  const triggerReload = () => setReloadTrigger(prev => !prev);

  const fetchClasses = async () => {
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

  const fetchTeachers = async () => {
    try {
      const response = await getNameOfTeachers();
      console.log("Test teacher name: ", response);
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response);
    } catch (error) {
      console.error("Error at fetching student data: ", error);
    }
  }

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, [reloadTrigger]);

  const handleAddClick = () => {
    setClassToEdit(null);
    setShowAddClassForm(true);
  };

  const handleUpdateClick = (classItem) => {
    setClassToEdit(classItem);
    setShowAddClassForm(true);
  };

  const filteredClass = useMemo(() => {
    return classData.filter(classDa => {
      const matchKeyword = classDa.name.toLowerCase().includes(keyword.toLowerCase());
      const matchStatus = selectedStatus === '' || classDa.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchCourse = selectedCourse === '' || classDa.name.toLowerCase() === selectedCourse.toLowerCase();
      return matchKeyword && matchStatus && matchCourse;
    });
  }, [keyword, selectedStatus, classData, selectedCourse]);

  return (
    <div className="main-wrapper">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className='class-header'>
            <h1>Class Management</h1>
            <p>Your comprehensive platform for detailed class insights.</p>
          </div>
          <div className="wrapper-header">
            <button onClick={handleAddClick}>
              <FaPlus />
              <div>Add new class</div>
            </button>
          </div>

          {showAddClassForm && (
            <AddClassForm
              onClose={() => setShowAddClassForm(false)}
              teacherData={teachers}
              setClassData={setClassData}
              classToEdit={classToEdit}
              triggerReload={triggerReload}
              students={students}
            />
          )}

          <div className='tab-navigation'>
            <button className={activeTab=='classes' ? 'tab-button active': 'tab-button'} onClick={() => setActiveTab('classes')}>Classes</button>
            <button className={activeTab=='announcements' ? 'tab-button active': 'tab-button'} onClick={() => setActiveTab('announcements')}>Announcements</button>
            <button className={activeTab=='analytics' ? 'tab-button active': 'tab-button'} onClick={() => setActiveTab('analytics')}>Analytics</button>
          </div>

          <div className="tab-search">
            <div className="search-box">
              <AiOutlineSearch className="search-icon" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search by class name, teacher..."
                className="search-input-class"
              />
            </div>

            <div className="filter-box">
              <FiFilter className="filter-icon" />
              <select className="filter-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          <select className="filter-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All Courses</option>
            {classData.map((className, index) => (
              <option key={index} value={className.name}>
                {className.name}
              </option>
            ))}
        </select>
          </div>

          {/* tab-content */}
          <div className='tab-content'>
            {renderTabContent()}
          </div>
          {activeTab === 'classes' && 
            <div className="card-grid">
              {filteredClass.map((classItem, index) => (
                <ClassCard
                  key={index}
                  classItem={classItem}
                  triggerReload={triggerReload}
                  handleUpdateClick={handleUpdateClick}
                />
              ))}
            </div>
          }
        </>
      )}
    </div>
  );
}

export default ClassManagement;
