import React from 'react';
import './SelfStudyPlanForm.css'; 


const UpdateSelfStudyPlanForm = () => {
  return (
    <form className="form-container">
        {/* <form className="form-container1" style={{ backgroundColor: '#22BBEA' }}>
            <h2>Update your process</h2>
        </form> */}
        <h2>Update your process</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>

        <div className="form-group">
          <label htmlFor="skill">Skill/Module</label>
          <select id="skill" name="skill">
            <option value="TOEIC">TOEIC</option>
            <option value="IELTS">IELTS</option>
            <option value="IT">IT</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lesson">My lesson - What did I learn today?</label>
          <input type="text" id="lesson" name="lesson" placeholder="I learned abcxyz" />
        </div>

        <div className="form-group">
          <label htmlFor="time-allocation">Time allocation</label>
          <input type="text" id="time-allocation" name="time-allocation" placeholder="30 minute" />
        </div>

        <div className="form-group">
          <label htmlFor="resource">Learning resource</label>
          <input type="text" id="resource" name="resource" placeholder="I learned abcxyz" />
        </div>

        <div className="form-group">
          <label htmlFor="activities">Learning activities</label>
          <input type="text" id="activities" name="activities" placeholder="30 minute" />
        </div>

        <div className="form-group">
          <label htmlFor="concentration">Concentration</label>
          <input type="text" id="concentration" name="concentration" placeholder="I learned abcxyz" />
        </div>

        <div className="form-group">
          <label htmlFor="plan">Plan & Follow plan</label>
          <input type="text" id="plan" name="plan" placeholder="30 minute" />
        </div>

        <div className="form-group">
          <label htmlFor="evaluation">Evaluation of My Work</label>
          <input type="text" id="evaluation" name="evaluation" placeholder="I learned abcxyz" />
        </div>

        <div className="form-group">
          <label htmlFor="reinforce">Reinforcing Learning</label>
          <input type="text" id="reinforce" name="reinforce" placeholder="30 minute" />
        </div>

        <div className="form-group full-width">
          <label htmlFor="evaluation2">Evaluation of My Work</label>
          <input type="text" id="evaluation2" name="evaluation2" placeholder="I learned abcxyz" />
        </div>
      </div>

      <div className="form-actions">
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default UpdateSelfStudyPlanForm;
