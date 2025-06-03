// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import { Outlet } from 'react-router-dom';
import TeacherHeader from '../components/shared/TeacherHeader';
const TeacherLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <TeacherHeader />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;