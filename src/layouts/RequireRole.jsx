import { Navigate, Outlet } from 'react-router-dom';

const RequireRole = ({ allowedRoles, userRole }) => {
    console.log('userRole:', userRole);
    console.log('allowedRoles:', allowedRoles);
    return allowedRoles.includes(userRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" replace />
    );
};

export default RequireRole;