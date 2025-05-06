import { NavLink } from 'react-router-dom';
import { sidebarItems } from '../../assets/icons/sidebar';
import './SideBar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <span role="img" aria-label="logo"><img src="/src/assets/image/graduation.png" alt="" /></span>
    </div>
    <nav className="sidebar-nav">
      {sidebarItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) =>
            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
          }
        >
          <span className="sidebar-link-icon" role="img" aria-label={item.label}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;