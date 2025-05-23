// src/layouts/StudentLayout.jsx
import React, { useEffect, useState } from "react";
import Header from '../components/admin/Header/Header';
import AdminMessage from '../components/shared/AdminMessage/AdminMessage';
import Sidebar from '../components/shared/SideBar';
import { Outlet } from 'react-router-dom';
import { getTotals } from "../services/api/StudentAPI";
const AdminLayout = () => {
    const [studentTotal, setStudents] = useState(0);
    const [teacherTotal, setTeachers] = useState(0);
    const [classeTotal, setClasses] = useState(0);
    
    useEffect(() => {
      const fetchTotals = async () => {
        try {
          const response = await getTotals();
          setStudents(response.students);
          setTeachers(response.teachers);
          setClasses(response.classes);
        } catch (error) {
          console.error("Failed to fetch totals in useEffect", error);
        }
      };
    
      fetchTotals();
    }, []);
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <Header />
        <div className="main-content">
          <Outlet context={{ studentTotal, teacherTotal, classeTotal }}/>
        </div>
      </main>
      <AdminMessage />
    </div>
  );
};

export default AdminLayout;