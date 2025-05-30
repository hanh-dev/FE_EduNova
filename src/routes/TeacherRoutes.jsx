import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import TeacherNotificationPage from '../pages/teacher/alert/TeacherNotificationPage';
import Dashboard from '../pages/teacher/Dashboard/Dashboard';
import StudentList from '../pages/teacher/StudentList/StudentList';

const TeacherRoutes = () => [
  <Route path="/" element={<TeacherLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="notifications" element={<TeacherNotificationPage />} />
    <Route path="class/:className" element={<StudentList />} />
    <Route path="classes/:classId/students" element={<StudentList />} />
    <Route path="students/student:id" element={<StudentList />} />

  </Route>

];

export default TeacherRoutes;
