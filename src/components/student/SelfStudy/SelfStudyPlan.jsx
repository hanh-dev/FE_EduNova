import React, { useEffect, useState } from 'react';
import './SelfStudyPlan.css';
import AddNewSelfStudy from '../Buttons/AddNewSelfStudyPlan';
import Buttons from '../Buttons/Buttons';
import { getAllSelfStudy, getAllWeek, createWeek } from '../../../services/api/StudentAPI';

function SelfStudy() {
  const [selfStudyData, setSelfStudyData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const currentSemesterId = 1;

  // Lấy dữ liệu tự học
  useEffect(() => {
    const fetchSelfStudyData = async () => {
      try {
        const response = await getAllSelfStudy();
        if (Array.isArray(response)) {
          setSelfStudyData(response);
        } else {
          console.error("Dữ liệu tự học không hợp lệ:", response);
          setSelfStudyData([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tự học:", error);
        setSelfStudyData([]);
      }
    };

    fetchSelfStudyData();
  }, []);

  // Lấy dữ liệu tuần
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const data = await getAllWeek();
        setWeeks(data);

        const weekOne = data.find(w => w.week_number === 1);
        if (weekOne) setSelectedWeekId(weekOne.id);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tuần:", error);
      }
    };

    fetchWeeks();
  }, []);

  // Định dạng ngày
  const formatDateTime = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} 00:00:00`;
  };

  // Thêm tuần mới
  const handleAddWeek = async () => {
    try {
      const maxWeekNumber = weeks.length > 0
        ? Math.max(...weeks.map(w => w.week_number))
        : 0;

      const newWeekNumber = maxWeekNumber + 1;

      let startDate;
      if (weeks.length > 0) {
        const lastWeek = weeks.reduce((prev, current) =>
          prev.week_number > current.week_number ? prev : current
        );
        startDate = new Date(lastWeek.end_date);
        startDate.setDate(startDate.getDate() + 1);
      } else {
        startDate = new Date();
      }

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const newWeekPayload = {
        week_number: newWeekNumber,
        semester_id: currentSemesterId,
        start_date: formatDateTime(startDate),
        end_date: formatDateTime(endDate),
      };

      const createdWeek = await createWeek(newWeekPayload);
      setWeeks(prev => [...prev, createdWeek]);
      setSelectedWeekId(createdWeek.id);
    } catch (error) {
      console.error("Lỗi khi thêm tuần mới:", error.response?.data || error.message);
      alert("Không thể thêm tuần mới. Vui lòng thử lại.");
    }
  };

  // Lọc dữ liệu theo tuần
  const filteredData = selectedWeekId
    ? selfStudyData.filter(item => item.week_id === selectedWeekId)
    : selfStudyData;

  return (
    <>
      

      <div className="study-table-container">
        <AddNewSelfStudy />
        <h2 className="table-title">Self-study</h2>

        <div className="study-table-wrapper">
          
          <table className="study-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skill/Module</th>
                <th>What did I learn today?</th>
                <th>Time Allocation</th>
                <th>Resources</th>
                <th>Activities</th>
                <th>Concentration</th>
                <th>Follow Plan</th>
                <th>Evaluation</th>
                <th>Reinforcement</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="13">No self-study data found.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id || `${item.date}-${item.skill_module}`}>
                    <td>{item.date}</td>
                    <td>{item.skill_module}</td>
                    <td>{item.lesson_summary}</td>
                    <td>{item.time_allocation}</td>
                    <td>{item.learning_resources}</td>
                    <td>{item.learning_activities}</td>
                    <td>{item.concentration}</td>
                    <td>{item.follow_plan}</td>
                    <td>{item.evaluation}</td>
                    <td>{item.reinforcement}</td>
                    <td>{item.notes}</td>
                    <td>
                      <span className={`a-status ${item.status === 'done' ? 'green' : 'red'}`}></span>
                      {item.status}
                    </td>
                    <td>
                      <Buttons type="selfstudy" recordData={item} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="week-buttons-container" style={{ marginBottom: '20px' }}>
        {weeks.map((week) => (
          <button
            key={week.id}
            className={`week-button ${selectedWeekId === week.id ? 'active-week' : ''}`}
            onClick={() => setSelectedWeekId(week.id)}
          >
            Week {week.week_number}
          </button>
        ))}
        <button
          key="add-week"
          className="week-button add-week"
          onClick={handleAddWeek}
        >
          +
        </button>
      </div>
    </>
  );
}

export default SelfStudy;
