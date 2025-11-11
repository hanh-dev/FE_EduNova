// import React, { useState, useEffect } from "react";
// import DeleteGoal from "../GoalForm/DeleteGoal";
// import TagTeacher from "../Form/TagTeacher";
// import GoalForm from "../GoalForm/GoalForm";
// import EditGoal from "../GoalForm/EditGoal";
// import TeacherResponseForm from "../Form/TeacherResponseForm";
// import StudentResponseForm from "../Form/StudentResponseForm";
// import {
//   updateGoalStatus,
//   getAllGoal,
//   createGoal,
//   editGoal,
// } from "../../../services/api/StudentAPI";
// import "./SemesterGoal.css";
// import { Bell, Dot, Info, Calendar } from 'lucide-react';

// export default function SemesterGoal({ semester }) {
//   const [goals, setGoals] = useState([]);
//   const [popup, setPopup] = useState({ showDeletePopup: false });
//   const [selectedGoal, setSelectedGoal] = useState({ goalToDeleteId: null });
//   const [tagTeacher, setTagTeacher] = useState(false);
//   const [selectedGoalId, setSelectedGoalId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [addingNew, setAddingNew] = useState(false);
//   const [editingGoalId, setEditingGoalId] = useState(null);
//   const [editData, setEditData] = useState({});
  
//   const [newGoalData, setNewGoalData] = useState({
//     course: "English",
//     goals: "",
//     courseExpectations: "",
//     teacherExpectations: "",
//     selfExpectations: "",
//     dueDate: "",
//   });

//   const goalsPerPage = 10;

//   // Cập nhật selectedSemester khi prop semester thay đổi
//   const [selectedSemester, setSelectedSemester] = useState(semester || { id: 1 });
//   useEffect(() => {
//     if (semester) setSelectedSemester(semester);
//   }, [semester]);

//   // Lấy danh sách goal từ API
//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const data = await getAllGoal();
//         setGoals(data);
//         localStorage.setItem("goals", JSON.stringify(data));
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//       }
//     };
//     fetchGoals();
//   }, []);

//   // Hàm đồng bộ goals vào state và localStorage
//   const updateGoals = (newGoals) => {
//     setGoals(newGoals);
//     localStorage.setItem("goals", JSON.stringify(newGoals));
//   };

//   // Hàm xử lý thêm goal mới
//   const handleSaveNewGoal = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user?.user_id) return alert("User not found. Please login again.");

//     // Kiểm tra các trường nhập
//     const fields = Object.values(newGoalData);
//     if (fields.some((field) => !field.trim()))
//       return alert("Please fill all fields.");

//     try {
//       const createdGoal = await createGoal({
//         ...newGoalData,
//         user_id: user.user_id,
//         completeStatus: "doing",
//         semester_id: selectedSemester.id,
//       });
//       updateGoals([...goals, createdGoal]);
//       setNewGoalData({
//         course: "",
//         goals: "",
//         courseExpectations: "",
//         teacherExpectations: "",
//         selfExpectations: "",
//         dueDate: "",
//       });
//       setAddingNew(false);
//     } catch (error) {
//       console.error("Error creating goal:", error);
//       alert("Failed to create new goal.");
//     }
//   };

//   const handleCancelNewGoal = () => {
//     setAddingNew(false);
//     setNewGoalData({
//       course: "",
//       goals: "",
//       courseExpectations: "",
//       teacherExpectations: "",
//       selfExpectations: "",
//       dueDate: "",
//     });
//   };

//   // Lọc goal theo học kỳ
//   const filteredGoals = goals.filter(
//     (goal) => goal.semester_id === selectedSemester?.id
//   );
//   const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);
//   const indexOfLastGoal = currentPage * goalsPerPage;
//   const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
//   const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal);

//   // Xử lý hiển thị TagTeacher khi comment
//   const handleCommentClick = (goalId) => {
//     setSelectedGoalId(goalId);
//     setTagTeacher(true);
//   };

//   const handleTagTeacherClose = () => {
//     setTagTeacher(false);
//     setSelectedGoalId(null);
//   };

//   // Chỉnh sửa goal
//   const handleEdit = (goalId) => {
//     setEditingGoalId(goalId);
//     const goal = goals.find((g) => g.id === goalId);
//     setEditData(goal || {});
//   };

//   const handleEditChange = (field, value) => {
//     setEditData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEditSave = async (goalId) => {
//     try {
//       const updatedGoal = await editGoal(goalId, editData);
//       const updatedGoals = goals.map((goal) =>
//         goal.id === goalId ? updatedGoal : goal
//       );
//       updateGoals(updatedGoals);
//       setEditingGoalId(null);
//     } catch (error) {
//       console.error("Error updating goal:", error);
//       alert("Failed to update goal.");
//     }
//   };

//   const handleDeleteSuccess = (deletedGoalId) => {
//     const updated = goals.filter((g) => g.id !== deletedGoalId);
//     updateGoals(updated);
//     setPopup({ ...popup, showDeletePopup: false });
//     setSelectedGoal({ goalToDeleteId: null });
//   };

//   const toggleGoalStatus = async (goalId, currentStatus) => {
//     const newStatus = currentStatus === "doing" ? "done" : "doing";
//     try {
//       updateGoals(
//         goals.map((g) =>
//           g.id === goalId ? { ...g, completeStatus: newStatus } : g
//         )
//       );
//       await updateGoalStatus(goalId, newStatus);
//     } catch (err) {
//       console.error("Update status failed:", err);
//       alert("Failed to update goal status.");
//       updateGoals(goals);
//     }
//   };

//   // Cards
//   const cards = [
//   {
//     title: 'Total',
//     count: filteredGoals.length,
//     desc: 'Total goals for this semester',
//     icon: <Calendar size={18} color="#1e88e5" />,
//   },
//   {
//     title: 'In Progress',
//     count: filteredGoals.filter(goal => goal.completeStatus === 'doing').length,
//     desc: 'Goals currently in progress',
//     icon: <Dot color="#f9a825" size={24} />,
//   },
//   {
//     title: 'Completed',
//     count: filteredGoals.filter(goal => goal.completeStatus === 'done').length,
//     desc: 'Goals successfully completed',
//     icon: <Info size={18} color="#43a047" />,
//   }
// ];

//   return (
//     <div className="container your-goal-big">
//       <div className="noti-header">
//         <h2>Semester Goals</h2>
//       </div>

//       <div className="noti-cards">
//         {cards.map((card, idx) => (
//           <div className="noti-card" key={idx}>
//             <div className="noti-card-header">
//               <span>{card.title}</span>
//               {card.icon}
//             </div>
//             <div className="noti-card-body">
//               <h3>{card.count}</h3>
//               <p>{card.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="your-goal">
//         {popup.showDeletePopup && selectedGoal.goalToDeleteId && (
//           <DeleteGoal
//             id={selectedGoal.goalToDeleteId}
//             onDeleteSuccess={() => handleDeleteSuccess(selectedGoal.goalToDeleteId)}
//             onClose={() => {
//               setPopup({ ...popup, showDeletePopup: false });
//               setSelectedGoal({ goalToDeleteId: null });
//             }}
//             onDelete={() => {
//               // Xóa trực tiếp (backup)
//               const updated = goals.filter(
//                 (g) => g.id !== selectedGoal.goalToDeleteId
//               );
//               updateGoals(updated);
//               setPopup({ ...popup, showDeletePopup: false });
//               setSelectedGoal({ goalToDeleteId: null });
//             }}
//           />
//         )}

//         {tagTeacher && (
//           <TagTeacher onClose={handleTagTeacherClose} goalId={selectedGoalId} />
//         )}

//         <div className="table-goal">
//           <table className="table table-your-goal">
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Goal</th>
//                 <th>Course Expectations</th>
//                 <th>Teacher Expectations</th>
//                 <th>Self Expectations</th>
//                 <th>Complete</th>
//                 <th>Due to</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody className="content">
//               {!addingNew && currentGoals.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" style={{ textAlign: "center", fontStyle: "italic" }}>
//                     No goal data available
//                   </td>
//                 </tr>
//               ) : (
//                 currentGoals.map((goal) =>
//                   editingGoalId === goal.id ? (
//                     <EditGoal
//                       key={goal.id}
//                       goalId={goal.id}
//                       editData={editData}
//                       onChange={handleEditChange}
//                       onSave={() => handleEditSave(goal.id)}
//                       onCancel={() => setEditingGoalId(null)}
//                     />
//                   ) : (
//                     <tr
//                       key={goal.id}
//                       className={`content ${
//                         goal.completeStatus === "done" ? "goal-done" : ""
//                       }`}
//                     >
//                       <td onClick={() => handleEdit(goal.id)}>{goal.course}</td>
//                       <td onClick={() => handleEdit(goal.id)}>{goal.goals}</td>
//                       <td onClick={() => handleEdit(goal.id)}>
//                         {goal.courseExpectations}
//                       </td>
//                       <td onClick={() => handleEdit(goal.id)}>
//                         {goal.teacherExpectations}
//                       </td>
//                       <td onClick={() => handleEdit(goal.id)}>
//                         {goal.selfExpectations}
//                       </td>
//                       <td>
//                         {goal.completeStatus === "doing" ? (
//                           <div
//                             style={{
//                               width: "20px",
//                               height: "20px",
//                               borderRadius: "5px",
//                               backgroundColor: "#ffe0b2",
//                               border: "none",
//                               margin: "auto",
//                               cursor: "pointer",
//                             }}
//                             title="Click to mark as done"
//                             onClick={() => toggleGoalStatus(goal.id, goal.completeStatus)}
//                           />
//                         ) : (
//                           <input
//                             type="checkbox"
//                             className="custom-checkbox"
//                             checked={true}
//                             onChange={() => toggleGoalStatus(goal.id, goal.completeStatus)}
//                           />
//                         )}
//                       </td>
//                       <td onClick={() => handleEdit(goal.id)}>{goal.dueDate}</td>
//                       <td>
//                         <button
//                           className="goal delete"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedGoal({ goalToDeleteId: goal.id });
//                             setPopup({ showDeletePopup: true });
//                           }}
//                         >
//                           <i className="fas fa-trash-alt icon-border"></i>
//                         </button>
//                         <button
//                           className="goal message"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleCommentClick(goal.id);
//                           }}
//                         >
//                           <i className="fas fa-comment icon-border"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   )
//                 )
//               )}

//               {addingNew && (
//                 <GoalForm
//                   newGoalData={newGoalData}
//                   setNewGoalData={setNewGoalData}
//                   onSave={handleSaveNewGoal}
//                   onCancel={handleCancelNewGoal}
//                 />
//               )}
//             </tbody>
//           </table>

//           <div
//             className="goal-header show-on-hover"
//             onClick={() => setAddingNew(true)}
//             style={{ cursor: "pointer" }}
//           >
//             <i
//               className="fa fa-plus icon_add"
//               alt="Add Goal"
//               style={{ color: "black" }}
//             ></i>
//           </div>
//         </div>

//         {totalPages > 1 && (
//           <div className="pagination">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 className={currentPage === i + 1 ? "active" : ""}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from "react";
import DeleteGoal from "../GoalForm/DeleteGoal";
import TagTeacher from "../Form/TagTeacher";
import GoalForm from "../GoalForm/GoalForm";
import EditGoal from "../GoalForm/EditGoal";
import TeacherResponseForm from "../Form/TeacherResponseForm";
import StudentResponseForm from "../Form/StudentResponseForm";
import {
  updateGoalStatus,
  getAllGoal,
  createGoal,
  editGoal,
} from "../../../services/api/StudentAPI";
import { useAuth } from "../../../services/providers/AuthContext";
import { getStudentResponses } from "../../../services/api/StudentAPI";
import { useLocation, useNavigate } from 'react-router-dom';
import "./SemesterGoal.css";
import { Bell, Dot, Info, Calendar } from 'lucide-react';

export default function SemesterGoal({ semester }) {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const highlightGoalId = state?.goalId || null;
  const [goals, setGoals] = useState([]);
  const [popup, setPopup] = useState({ showDeletePopup: false });
  const [selectedGoal, setSelectedGoal] = useState({ goalToDeleteId: null });
  const [tagTeacher, setTagTeacher] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addingNew, setAddingNew] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editData, setEditData] = useState({});
  const [responses, setResponses] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  
  const [newGoalData, setNewGoalData] = useState({
    course: "English",
    goals: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: "",
  });

  const goalsPerPage = 10;

  const goalRefs = useRef({});

  const [selectedSemester, setSelectedSemester] = useState(semester || { id: 1 });
  function getTeacherData() {
    const raw = localStorage.getItem('teacherData');
    try {
      const data = JSON.parse(raw);
      return data?.role === 'teacher' ? data : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (semester) setSelectedSemester(semester);

    const teacherData = getTeacherData();
    setIsTeacher(Boolean(teacherData));
  }, [semester]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getAllGoal();
        setGoals(data);
        localStorage.setItem("goals", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        if (!user?.id) {
          throw new Error("User ID is not available");
        }
        console.log("Fetching responses for user.id:", user.id);
        const responseData = await getStudentResponses(user.id);
        setResponses(responseData);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    if (user.role === 'student' && user.id) {
      fetchResponses();
    }
  }, [user.id, user.role]);

  useEffect(() => {
    if (highlightGoalId && goalRefs.current[highlightGoalId]) {
goalRefs.current[highlightGoalId].scrollIntoView({ behavior: "smooth" });
      setSelectedGoalId(highlightGoalId);
      setTagTeacher(true);
    }
  }, [highlightGoalId, goals]);

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const handleSaveNewGoal = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.user_id) return alert("User not found. Please login again.");

    const fields = Object.values(newGoalData);
    if (fields.some((field) => !field.trim()))
      return alert("Please fill all fields.");

    try {
      const createdGoal = await createGoal({
        ...newGoalData,
        user_id: user.user_id,
        completeStatus: "doing",
        semester_id: selectedSemester.id,
      });
      updateGoals([...goals, createdGoal]);
      setNewGoalData({
        course: "",
        goals: "",
        courseExpectations: "",
        teacherExpectations: "",
        selfExpectations: "",
        dueDate: "",
      });
      setAddingNew(false);
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Failed to create new goal.");
    }
  };

  const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');

  const handleCancelNewGoal = () => {
    setAddingNew(false);
    setNewGoalData({
      course: "",
      goals: "",
      courseExpectations: "",
      teacherExpectations: "",
      selfExpectations: "",
      dueDate: "",
    });
  };

  const filteredGoals = goals.filter(
    (goal) => goal.semester_id === selectedSemester?.id
  );
  const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  const handleCommentClick = async (goalId) => {
    setSelectedGoalId(goalId);
    const response = responses.find(resp => resp.goal_id === goalId);
    if (user.role === 'teacher' && response) {
      setTagTeacher(true);
    } else if (user.role === 'student') {
      setTagTeacher(true);
    }
  };

  const handleTagTeacherClose = () => {
    setTagTeacher(false);
    setSelectedGoalId(null);
  };

  const handleEdit = (goalId) => {
    setEditingGoalId(goalId);
    const goal = goals.find((g) => g.id === goalId);
    setEditData(goal || {});
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (goalId) => {
    try {
      const updatedGoal = await editGoal(goalId, editData);
      const updatedGoals = goals.map((goal) =>
        goal.id === goalId ? updatedGoal : goal
      );
      updateGoals(updatedGoals);
      setEditingGoalId(null);
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal.");
    }
  };

  const handleDeleteSuccess = (deletedGoalId) => {
const updated = goals.filter((g) => g.id !== deletedGoalId);
    updateGoals(updated);
    setPopup({ ...popup, showDeletePopup: false });
    setSelectedGoal({ goalToDeleteId: null });
  };

  const toggleGoalStatus = async (goalId, currentStatus) => {
    const newStatus = currentStatus === "doing" ? "done" : "doing";
    try {
      updateGoals(
        goals.map((g) =>
          g.id === goalId ? { ...g, completeStatus: newStatus } : g
        )
      );
      await updateGoalStatus(goalId, newStatus);
    } catch (err) {
      console.error("Update status failed:", err);
      alert("Failed to update goal status.");
      updateGoals(goals);
    }
  };

  const handleBack = () => {
    const teacherData = JSON.parse(localStorage.getItem('teacherData'));
    if (teacherData) {
      setUser({
        username: teacherData.username,
        role: teacherData.role,
        user_id: teacherData.user_id,
      });
      localStorage.removeItem('teacherData');
      navigate('/notifications');
    }
  };

  const cards = [
    { title: 'Total', count: filteredGoals.length, desc: 'Total goals for this semester', icon: <Calendar size={18} color="#1e88e5" /> },
    { title: 'In Progress', count: filteredGoals.filter(goal => goal.completeStatus === 'doing').length, desc: 'Goals currently in progress', icon: <Dot color="#f9a825" size={24} /> },
    { title: 'Completed', count: filteredGoals.filter(goal => goal.completeStatus === 'done').length, desc: 'Goals successfully completed', icon: <Info size={18} color="#43a047" /> },
  ];

  return (
    <div className="container your-goal-big">
      <div className="noti-header">
        <h2>Semester Goals</h2>
        {isTeacher && (
          <button className="back-button" onClick={handleBack}>Back to Teacher View</button>
        )}
      </div>
      <div className="noti-cards">
        {cards.map((card, idx) => (
          <div className="noti-card" key={idx}>
            <div className="noti-card-header">
              <span>{card.title}</span>
              {card.icon}
            </div>
            <div className="noti-card-body">
              <h3>{card.count}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="your-goal">
        {popup.showDeletePopup && selectedGoal.goalToDeleteId && (
          <DeleteGoal
            id={selectedGoal.goalToDeleteId}
            onDeleteSuccess={() => handleDeleteSuccess(selectedGoal.goalToDeleteId)}
            onClose={() => {
              setPopup({ ...popup, showDeletePopup: false });
              setSelectedGoal({ goalToDeleteId: null });
            }}
            onDelete={() => {
              const updated = goals.filter((g) => g.id !== selectedGoal.goalToDeleteId);
              updateGoals(updated);
              setPopup({ ...popup, showDeletePopup: false });
setSelectedGoal({ goalToDeleteId: null });
            }}
          />
        )}
        {tagTeacher && (
          <React.Fragment>
            {isTeacher ? (
              <TeacherResponseForm
                goalId={selectedGoalId}
                teacherId={teacherData.user_id}
                onClose={handleTagTeacherClose}
              />
            ) : (
              <StudentResponseForm
                goalId={selectedGoalId}
                studentId={user?.user_id}
                onClose={handleTagTeacherClose}
              />
            )}
          </React.Fragment>
        )}
        <div className="table-goal">
          <table className="table table-your-goal">
            <thead>
              <tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Course Expectations</th>
                <th>Teacher Expectations</th>
                <th>Self Expectations</th>
                <th>Complete</th>
                <th>Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="content">
              {!addingNew && currentGoals.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", fontStyle: "italic" }}>
                    No goal data available
                  </td>
                </tr>
              ) : (
                currentGoals.map((goal) => {
                  const response = responses.find(resp => resp.goal_id === goal.id);
                  return editingGoalId === goal.id ? (
                    <EditGoal
                      key={goal.id}
                      goalId={goal.id}
                      editData={editData}
                      onChange={handleEditChange}
                      onSave={() => handleEditSave(goal.id)}
                      onCancel={() => setEditingGoalId(null)}
                    />
                  ) : (
                    <tr
                      key={goal.id}
                      className={`content ${goal.completeStatus === "done" ? "goal-done" : ""} ${goal.id === highlightGoalId ? "highlighted-goal" : ""}`}
                      ref={(el) => (goalRefs.current[goal.id] = el)}
                    >
                      <td onClick={() => handleEdit(goal.id)}>{goal.course}</td>
                      <td onClick={() => handleEdit(goal.id)}>{goal.goals}</td>
                      <td onClick={() => handleEdit(goal.id)}>{goal.courseExpectations}</td>
                      <td onClick={() => handleEdit(goal.id)}>{goal.teacherExpectations}</td>
                      <td onClick={() => handleEdit(goal.id)}>{goal.selfExpectations}</td>
                      <td>
                        {goal.completeStatus === "doing" ? (
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "5px",
backgroundColor: "#ffe0b2",
                              border: "none",
                              margin: "auto",
                              cursor: "pointer",
                            }}
                            title="Click to mark as done"
                            onClick={() => toggleGoalStatus(goal.id, goal.completeStatus)}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={true}
                            onChange={() => toggleGoalStatus(goal.id, goal.completeStatus)}
                          />
                        )}
                      </td>
                      <td onClick={() => handleEdit(goal.id)}>{goal.dueDate}</td>
                      <td>
                        <button
                          className="goal delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGoal({ goalToDeleteId: goal.id });
                            setPopup({ showDeletePopup: true });
                          }}
                        >
                          <i className="fas fa-trash-alt icon-border"></i>
                        </button>
                        <button
                          className={`goal message ${response ? 'highlighted-comment' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCommentClick(goal.id);
                          }}
                        >
                          <i className="fas fa-comment icon-border"></i>
                          {user.role === 'student' && response && response.teacher_response && !response.is_read && (
                            <span className="badge">1</span>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
              {addingNew && (
                <GoalForm
                  newGoalData={newGoalData}
                  setNewGoalData={setNewGoalData}
                  onSave={handleSaveNewGoal}
                  onCancel={handleCancelNewGoal}
                />
              )}
            </tbody>
          </table>
          <div
            className="goal-header show-on-hover"
            onClick={() => setAddingNew(true)}
            style={{ cursor: "pointer" }}
          >
            <i
              className="fa fa-plus icon_add"
              alt="Add Goal"
              style={{ color: "black" }}
            ></i>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}