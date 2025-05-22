import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import Academy1 from '../pages/teacher/Academy/Academy1';
// import { Alert } from 'bootstrap';
const TeacherRoutes = () => [
    <Route path="/" element={<TeacherLayout />} key="layout-teacher">
      <Route index element={<Academy1  />} />
      <Route path="/alert" element={< Academy1  />} />
      {/* <Route path="achievement" element={<Academy />} /> */}
    </Route>
 
];

export default TeacherRoutes;
