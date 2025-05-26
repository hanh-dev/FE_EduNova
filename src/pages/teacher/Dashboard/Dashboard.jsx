import React from 'react';
import { Card, Statistic } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';
import ClassList from '../../../components/teacher/ClassList/ClassList';
const Dashboard = () => {
    return (
        <div style={{ padding: '24px' }}>
            {/* <h1>Teacher Dashboard</h1> */}
         <ClassList ></ClassList>
        </div>
    );
};

export default Dashboard;
