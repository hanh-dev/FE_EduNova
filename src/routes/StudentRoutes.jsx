import { Route } from 'react-router-dom';
import { StudentLayout } from '../layouts';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
import { Academy } from '../pages/student/Academy/Academy';
import RequireRole from '../components/shared/RequireRole';

const StudentRoutes = ({ userRole }) => [
  <Route
    element={<RequireRole allowedRoles={['student']} userRole={userRole} />}
    key="student"
  >
    <Route path="/" element={<StudentLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} />
    </Route>
  </Route>
];

export default StudentRoutes;
