// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import Header from '../components/shared/Header';
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