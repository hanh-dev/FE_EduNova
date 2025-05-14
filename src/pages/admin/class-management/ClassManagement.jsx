import React from 'react'
import ClassCard from '../../../components/admin/ClassCard/ClassCard';
import { itEnglish } from '../../../assets';
import { avatar } from '../../../assets';
import { addIcon } from '../../../assets';
import './ClassManagement.css'

function ClassManagement() {
  const classData = [
  {
    name: 'TOEIC',
    teacher: 'Ho Van Hanh',
    imageUrl: itEnglish,
    avatarUrl: avatar,
    description: 'TOEIC measures English skills for the workplace, focusing on listening and reading.',
    total: 45
  },
  {
    name: 'IELTS',
    teacher: 'Nguyen Van A',
    imageUrl: itEnglish,
    avatarUrl: avatar,
    description: 'IELTS prepares students for international English communication.',
    total: 45
  },
    {
    name: 'IELTS',
    teacher: 'Nguyen Van A',
    imageUrl: itEnglish,
    avatarUrl: avatar,
    description: 'IELTS prepares students for international English communication.',
    total: 45
  },
    {
    name: 'IELTS',
    teacher: 'Nguyen Van A',
    imageUrl: itEnglish,
    avatarUrl: avatar,
    total: 45,
    description: 'IELTS prepares students for international English communication.',
  },
    {
    name: 'IELTS',
    teacher: 'Nguyen Van A',
    imageUrl: itEnglish,
    avatarUrl: avatar,
    description: 'IELTS prepares students for international English communication.',
    total: 45
  },
];

  return (
    <div className="main-wrapper">
      <div className='wrapper-header'>
        <button>
          <img src={addIcon} alt="Add Icon" className="button-icon" />
          Add new class
        </button>
        <h1>Class Management</h1>
      </div>
      <div className="card-grid">
        {classData.map((classItem, index) => (
          <ClassCard key={index} classItem={classItem}/>
        ))}
      </div>
    </div>
  );
}

export default ClassManagement