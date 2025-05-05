import { Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
import { Academy } from '../pages/student/Academy/Academy';
import ClassPlan1 from '../pages/student/StudyPlan/ClassPlan1';

const StudentRoutes = () => [
    <Route path="/" element={<StudentLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} />
      <Route path="study-plans" element={<ClassPlan1 />} />
    </Route>
];

export default StudentRoutes;
