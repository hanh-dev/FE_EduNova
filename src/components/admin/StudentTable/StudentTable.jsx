import React, { useState } from 'react';
import { Table, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteStudent } from '../../../services/api/StudentAPI';

function StudentTable({ students }) {
  const handleDelete = async(id) => {
    try {
      const response = await deleteStudent(id);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} alt="student" width={40} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}/>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 8 }}
        style={{ fontSize: '12px' }}
      />
    </>
  );
}

export default StudentTable;
