import "./Dashboard.css";
import AdminCard from "../../../components/admin/AdminCard/AdminCard";
import StatsLineChart from "../../../components/admin/StatsLineChart/StatsLineChart";
import EChartLine from "../../../components/admin/StatsLineChart/StatsLineChart";
import RequestByTeacherChart from "../../../components/admin/RequestByTeacherChart/RequestByTeacherChart";
import RequestByMonthTeacherChart from "../../../components/admin/StatsLineChart/RequestMoth";
import RequestBySubjectChart from "../../../components/admin/StatsLineChart/RequestBySubjectChart";
import { useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const { studentTotal, teacherTotal, classeTotal } = useOutletContext();
  const stats = [
    { title: "Teachers", number: teacherTotal, icon: '🧑‍🏫'},
    { title: "Students", number: studentTotal , icon: '🧑‍🎓'},
    { title: "Classes", number: classeTotal, icon: '🏫'},
  ];
  return (
    <div className="dashboard-container">
      <div className="box-content">
        <h2>Admin Dashboard</h2>

        {/* Tổng quan */}
        <div className="grid stats">
          {stats.map((item, index) => (
            <AdminCard key={index} title={item.title} number={item.number} icon={item.icon}/>
          ))}
        </div>

        <EChartLine />
        <RequestBySubjectChart />
        <RequestByMonthTeacherChart />
      </div>
    </div>
  );
};

export default Dashboard;
