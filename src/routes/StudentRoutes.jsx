import { Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
import { Academy } from '../pages/student/Academy/Academy';
import StudyPlan from '../pages/student/StudyPlan/StudyPlan';
import Logout from '../pages/Logout/Logout';
import Profile from '../components/student/Profile/Profile';
import RequireAuth from '../components/shared/RequireAuth/RequireAuth';

const StudentRoutes = () => [
  <Route path="/" element={<StudentLayout />} key="layout-student">
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="semester-goals" element={<Semester />} />
    <Route path="achievement" element={<Academy />} />
    <Route path="study-plans" element={<StudyPlan />} />
    <Route path="logout" element={<Logout />} />
    <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
  </Route>
];

export default StudentRoutes;

