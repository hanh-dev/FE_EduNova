import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../services/providers/AuthContext';
import StudentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes';
// import TeacherRoutes from './TeacherRoutes';
// import AdminRoutes from './AdminRoutes';
// import Unauthorized from '../pages/common/Unauthorized';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
        {user.role === 'student' && StudentRoutes({ userRole: user.role })}
        {user.role === 'teacher' && TeacherRoutes({ userRole: user.role })}
        {/* {user.role === 'admin' && AdminRoutes({ userRole: user.role })} */}
      {/* {TeacherRoutes({ userRole: user.role })}
      {AdminRoutes({ userRole: user.role })} */}
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
    </Routes>
  );
};

export default AppRoutes;
