import React, { useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import AddNewClassPlan from "../Buttons/AddNewClassPlan";
import {
  getAllInClass,
  editInClass,
  getAllWeek,
  createWeek,
} from "../../../services/api/StudentAPI";
import "./ClassPlan.css";

function ClassPlan() {
  const [inClassData, setInClassData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekId, setSelectedWeekId] = useState(null);
  const currentSemesterId = 1;

  // Lấy dữ liệu In-Class
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInClass();
        setInClassData(data);
      } catch (error) {
        console.error("Failed to fetch in-class data", error);
      }
    };
    fetchData();
  }, []);

  // Lấy danh sách tuần
  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const data = await getAllWeek();
        setWeeks(data);
        // Chọn tuần đầu tiên làm mặc định
        if (data.length > 0) setSelectedWeekId(data[0].id);
      } catch (error) {
        console.error("Failed to fetch weeks", error);
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
      const maxNumber = weeks.length
        ? Math.max(...weeks.map(w => w.week_number))
        : 0;
      const newNumber = maxNumber + 1;

      let startDate;
      if (weeks.length) {
        const lastWeek = weeks.reduce((a, b) =>
          a.week_number > b.week_number ? a : b
        );
        startDate = new Date(lastWeek.end_date);
        startDate.setDate(startDate.getDate() + 1);
      } else {
        startDate = new Date();
      }

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const payload = {
        week_number: newNumber,
        semester_id: currentSemesterId,
        start_date: formatDateTime(startDate),
        end_date: formatDateTime(endDate),
      };

      const newWeek = await createWeek(payload);
      setWeeks(prev => [...prev, newWeek]);
      setSelectedWeekId(newWeek.id);
    } catch (error) {
      console.error("Error creating week", error.response || error.message);
      alert("Không thể thêm tuần mới. Vui lòng thử lại.");
    }
  };

  // Cập nhật problem_solved
  const handleProblemSolvedChange = async (id, solved) => {
    const item = inClassData.find(x => x.id === id);
    if (!item) return;
    const updated = { ...item, problem_solved: solved ? 1 : 0 };
    setInClassData(data => data.map(x => x.id === id ? updated : x));
    try {
      await editInClass(id, updated);
    } catch (error) {
      console.error("Failed to update problem_solved", error);
    }
  };

  // Callback khi thêm mới từ modal
  const handleAddNewItem = newItem => {
    setInClassData(prev => [newItem, ...prev]);
  };

  // Lọc dữ liệu theo tuần
  const filteredData = selectedWeekId
    ? inClassData.filter(item => item.week_id === selectedWeekId)
    : inClassData;

  return (
    <div className="a-main-content-check">
      <div className="a-table-section">
        <AddNewClassPlan onAddNewPlan={handleAddNewItem} />
        <h2>In class</h2>
        <table className="table-inclass">
          <thead>
            <tr>
              <th>Date</th>
              <th>Skill/Module</th>
              <th>Lesson Summary</th>
              <th>Self-assessment</th>
              <th>Difficulties</th>
              <th>Improvement Plan</th>
              <th>Problem Solved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{item.date}</td>
                <td>{item.skill_module}</td>
                <td>{item.lesson_summary}</td>
                <td>{item.self_assessment}</td>
                <td>{item.difficulties}</td>
                <td>{item.improvement_plan}</td>
                <td className="option_yes_no">
                  <select
                    value={item.problem_solved ? "yes" : "no"}
                    onChange={e =>
                      handleProblemSolvedChange(
                        item.id,
                        e.target.value === "yes"
                      )
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </td>
                <td className="action-buttons">
                  <Buttons
                    type="class"
                    recordData={item}
                    inclass={item}
                    onUpdate={updated => setInClassData(data => data.map(x => x.id === updated.id ? updated : x))}
                    onDelete={deletedId => setInClassData(data => data.filter(x => x.id !== deletedId))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nút tuần bên dưới bảng */}
        <div className="week-buttons-container-inclass" style={{ marginTop: '20px' }}>
          {weeks.map(w => (
            <button
              key={w.week_number}
              className={`week-button-inclass ${selectedWeekId === w.id ? 'active-week' : ''}`}
              onClick={() => setSelectedWeekId(w.id)}
            >
              Week {w.week_number}
            </button>
          ))}
          <button className="week-button-inclass add-week" onClick={handleAddWeek}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ClassPlan;
