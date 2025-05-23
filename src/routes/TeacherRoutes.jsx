import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import Dashboard from '../pages/teacher/Dashboard/Dashboard';
import StudentList from '../pages/teacher/StudentList/StudentList'; 
// import { Alert } from 'bootstrap';
const TeacherRoutes = () => [
    <Route path="/" element={<TeacherLayout />} key="layout-teacher">
      <Route index element={<Dashboard  />} />
      <Route path="/alert" element={< Dashboard  />} />
      {/* <Route path="achievement" element={<Academy />} /> */}
      <Route path="class/:className" element={<StudentList />} />
    </Route>
 
];

export default TeacherRoutes;
