import { Route } from 'react-router-dom';
import  Dashboard  from '../pages/student/Dashboard/Dashboard';
import Semester from '../pages/student/Semester/Semester';
import StudentLayout from '../layouts/StudentLayout';
import Academy from '../pages/student/Academy/Academy';
const StudentRoutes = () => [
    <Route path="/" element={<StudentLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} />
      
    </Route>
];

export default StudentRoutes;
