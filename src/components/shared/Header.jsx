import React, { useState } from "react";
import "./Header.css";
import {
  Bell
} from 'lucide-react';
import HeaderNotify from "./HeaderNotify/HeaderNotify";

const Header = ({totalUnread, notificationsList}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <header className="header">
      <div className="header-container">
        {/* Header with user info */}
        <div className="user-info">
          <div className="user-info-inner">
            <div className="notification-icon" onClick={() => setShowModal(prev => !prev)}>
              <Bell size={18}/>
              <div className="header-dot">{totalUnread}</div>
              {/* Notifi */}
              {showModal && <HeaderNotify notificationsList={notificationsList}/>}
            </div>
            <div className="user-avatar">KT</div>
            <span className="user-name">Kim Thanh</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="welcome-card">
          <div className="welcome-text">
            <h1 className="welcome-title">Welcome back Kim Thanh</h1>
            <p className="welcome-info">
              Today you have <span className="highlight">9 new applications</span>.
            </p>
            <p className="welcome-info">
              Also you need to hire for <span className="highlight">Developer, ReactJS Developer</span>.
            </p>
          </div>
          <div className="welcome-illustration">
            <img
              src="../../../src/assets/image/anhstudent.png"
              alt="User Illustration"
              className="illustration-img"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

