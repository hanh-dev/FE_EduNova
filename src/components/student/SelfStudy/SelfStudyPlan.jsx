import React, { useEffect, useState } from 'react';
import './SelfStudyPlan.css';
import Date from '../DateSchedule/Date'
// import Buttons from '../Buttons/Buttons';
import AddNewSelfStudy from '../Buttons/AddNewSelfStudyPlan';
import { getAllSelfStudy} from '../../../services/api/StudentAPI';

function SelfStudy() {
  const [selfStudyData, setSelfStudyData] = useState([]);
  useEffect(() => {
    const data = async() => {
      const response = await getAllSelfStudy();
      setSelfStudyData(response);
    } 
    data();
  }, [])
  return (
    <div className="study-table-container">
      <AddNewSelfStudy></AddNewSelfStudy>
      <h2 className="table-title">Self-study</h2>
      <div className="study-table-wrapper">
        <table className="study-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skill/Module</th>
              <th>My lesson - What did I learn today?</th>
              <th>Time Allocation</th>
              <th>Learning Resources</th>
              <th>Learning Activities</th>
              <th>Concentration</th>
              <th>Plan & Follow Plan</th>
              <th>Evaluation of My Work</th>
              <th>Reinforcing Learning</th>
              <th>Notes</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
          {selfStudyData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.skill_module}</td>
                <td>{item.lesson_summary}</td>
                <td>{item.time_allocation}</td>
                <td>{item.learning_resources}</td>
                <td>{item.learning_activities}</td>
                <td>{item.concentration}</td>
                <td>{item.evaluation}</td>
                <td>{item.follow_plan}</td>
                <td>{item.reinforcement}</td>
                <td>{item.notes}</td>
                <td>
                  <span className={`a-status ${item.problemSolved ? 'green' : 'red'}`}></span>
                </td>
                {/* <Buttons type="class" selfstudy={item} /> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}export default SelfStudy;