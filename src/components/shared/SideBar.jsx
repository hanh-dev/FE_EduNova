import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Semester goals', icon: '🎯', href: '/semester-goals' },
  { label: 'Study Plans', icon: '📚', href: '#' },
  { label: 'Academic achievement', icon: '🏆', href: '/achievement' },
  { label: 'Schedule', icon: '📅', href: '#' },
  { label: 'Logout', icon: '🚪', href: '#' },
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <span role="img" aria-label="logo">🎓</span>
    </div>
    <nav className="sidebar-nav">
      {sidebarItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) =>
            isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
          }
          end={item.href === '/'}
        >
          <span className="sidebar-link-icon" role="img" aria-label={item.label}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;