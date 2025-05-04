import { Route } from 'react-router-dom';
import { StudentLayout, TeacherLayout } from '../layouts';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
import { Academy } from '../pages/student/Academy/Academy';
import RequireRole from '../components/shared/RequireRole';

const TeacherRoutes = ({ userRole }) => [
  <Route
    element={<RequireRole allowedRoles={['teacher']} userRole={userRole} />}
    key="teacher"
  >
    <Route path="/" element={<TeacherLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} />
    </Route>
  </Route>
];

export default TeacherRoutes;
