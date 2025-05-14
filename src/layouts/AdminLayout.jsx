// src/layouts/StudentLayout.jsx
import Header from '../components/admin/Header/Header';
import Sidebar from '../components/shared/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;