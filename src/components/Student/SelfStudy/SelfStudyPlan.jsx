import React from 'react';
import './SelfStudyPlan.css';
import Buttons from '../Buttons/Buttons';

function SelfStudy() {
  return (
    <div className="study-table-container">
      <h2 className="table-title">Self-study</h2>
      
      {/* WRAP TABLE WITH SCROLLABLE DIV */}
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
            <tr>
              <td>14 Apr</td>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>10m</td>
              <td>Youtube</td>
              <td>Watch video</td>
              <td>No</td>
              <td>Yes</td>
              <td>Not so bad</td>
              <td>Review regularly</td>
              <td>Nothing</td>
              <Buttons/>
            </tr>
            <tr>
              <td>14 Apr</td>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>30m</td>
              <td>Youtube</td>
              <td>Watch video</td>
              <td>No</td>
              <td>Yes</td>
              <td>Not so bad</td>
              <td>Review regularly</td>
              <td>Nothing</td>
              <Buttons/>
            </tr>
            <tr>
              <td>14 Apr</td>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>30m</td>
              <td>Youtube</td>
              <td>Watch video</td>
              <td>No</td>
              <td>Yes</td>
              <td>Not so bad</td>
              <td>Review regularly</td>
              <td>Nothing</td>
              <Buttons/>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelfStudy;
