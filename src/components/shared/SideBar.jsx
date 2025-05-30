import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sidebarItems, sidebarItemsAdmin, sidebarItemsTeacher } from '../../assets/icons/sidebar';
import { handleLogout } from '../../utils/swal';
import { useAuth } from '../../services/providers/AuthContext';

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if teacher is viewing student page
  const isTeacherViewing = location.state?.isTeacherViewing;
  
  // Debug logs
  console.log("Location state:", location.state);
  console.log("isTeacherViewing:", isTeacherViewing);
  console.log("User role:", user?.role);

  const handleBackToStudentList = () => {
    const user = localStorage.getItem('teacherData');
    const userData ={
      username: user.name,
      role: 'teacher',
      user_id: user.user_id
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate('/classes/1/students')
    console.log('test teacher data', user);
  };

  

  // Determine which items to render
  let itemsToRender;
  if (user?.role === 'admin') {
    itemsToRender = sidebarItemsAdmin;
  } else if (user?.role === 'teacher') {
    itemsToRender = sidebarItemsTeacher;
  } else {
    // For student role, check if teacher is viewing
    if (isTeacherViewing) {
      // Add "Back to Student List" button for teacher viewing student page
      itemsToRender = [
        ...sidebarItems.slice(0, -1), // All items except logout
        { label: 'Back to Student List', icon: '⬅️', action: handleBackToStudentList },
        sidebarItems[sidebarItems.length - 1] // Logout item at the end
      ];
    } else {
      itemsToRender = sidebarItems;
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span role="img" aria-label="logo">🎓</span>
      </div>
      <nav className="sidebar-nav">
        {itemsToRender.map((item, index) => {
          // Handle items with custom actions (like Back to Student List)
          if (item.action) {
            return (
              <button
                key={item.label}
                className="sidebar-link"
                onClick={item.action}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span className="sidebar-link-icon" role="img" aria-label={item.label}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          }
          
          // Handle logout items
          if (item.isLogout) {
            return (
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
            );
          }
          
          // Handle regular navigation items
          return (
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
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;