import { NavLink } from 'react-router-dom';
import { sidebarItems } from '../../assets/icons/sidebar';
import { handleLogout } from '../../utils/swal';
const Sidebar = () => {
  return (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <span role="img" aria-label="logo">🎓</span>
    </div>
    <nav className="sidebar-nav">
    {sidebarItems.map((item) =>
      item.isLogout ? (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) =>
            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
          }
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <span className="sidebar-link-icon" role="img" aria-label={item.label}>
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ) : (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) =>
            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
          }
        >
          <span className="sidebar-link-icon" role="img" aria-label={item.label}>
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      )
    )}
    </nav>
  </aside>
  )
};

export default Sidebar;