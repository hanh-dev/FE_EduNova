import React, { useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import AddNewClassPlan from "../Buttons/AddNewClassPlan";
import { getAllInClass, editInClass } from "../../../services/api/StudentAPI";
import "./ClassPlan.css";

function ClassPlan() {
  const [inClassData, setInClassData] = useState([]);

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

  const handleProblemSolvedChange = async (id, newValue) => {
    const currentItem = inClassData.find((item) => item.id === id);
    if (!currentItem) return;

    const updatedData = {
      ...currentItem,
      problem_solved: newValue ? 1 : 0,
    };

    setInClassData((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedData : item))
    );

    try {
      await editInClass(id, updatedData);
      console.log("Updated successfully");
    } catch (error) {
      console.error("Failed to update problem_solved", error);
    }
  };

  const handleUpdateItem = (updatedItem) => {
    setInClassData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (deletedId) => {
    setInClassData((prevData) =>
      prevData.filter((item) => item.id !== deletedId)
    );
  };

  const handleAddNewItem = (newItem) => {
    setInClassData((prevData) => [newItem, ...prevData]);
  };

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
              <th>My lesson - What did I learn today?</th>
              <th>Self-assessment</th>
              <th>My difficulties</th>
              <th>My improvement plan</th>
              <th>Problem Solved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inClassData.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.date}</td>
                <td>{item.skill_module}</td>
                <td>{item.lesson_summary}</td>
                <td>{item.self_assessment}</td>
                <td>{item.difficulties}</td>
                <td>{item.improvement_plan}</td>
                <td className="option_yes_no">
                  <select
                    value={item.problem_solved ? "yes" : "no"}
                    onChange={(e) =>
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
                {/* <Buttons type="class" recordData={item} /> */}

                  <Buttons
                   type="class" recordData={item}
                    inclass={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassPlan;
