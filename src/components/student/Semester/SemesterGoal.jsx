import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../services/providers/AuthContext";
import GoalForm from "../../student/GoalForm/GoalForm";
import DeleteGoal from "../GoalForm/DeleteGoal";
import EditGoal from "../GoalForm/EditGoal";
import {
  updateGoalStatus,
  getGoal,
  getAllGoal,
} from "../../../services/api/StudentAPI";
import TeacherResponseForm from "../Form/TeacherResponseForm";
import "./SemesterGoal.css";
import TagTeacher from "../Form/TagTeacher";

export default function SemesterGoal({ semester }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const location = useLocation();
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState({ id: 1 });
  const [tagTeacher, setTagTeacher] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseGoalId, setResponseGoalId] = useState(null);
  const goalsPerPage = 10;
  const goalRefs = useRef({});

  const highlightedGoalId = location.state?.goalId;

  const isTeacherFromNotification = (() => {
    const teacherData = localStorage.getItem('teacherData');
    console.log("User:", user);
    console.log("teacherData:", teacherData);
    if (!teacherData || !user) return false;
    const parsedTeacherData = JSON.parse(teacherData);
    return (
      user?.role === 'student' &&
      parsedTeacherData?.role === 'teacher' &&
      parsedTeacherData?.user_id
    );
  })();

  const teacherId = isTeacherFromNotification
    ? JSON.parse(localStorage.getItem('teacherData'))?.user_id
    : null;

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => goal.semester_id === selectedSemester?.id);
  }, [goals, selectedSemester]);

  useEffect(() => {
    if (semester) setSelectedSemester(semester);
  }, [semester]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await getAllGoal();
        console.log("Fetched goals:", fetchedGoals);
        setGoals(fetchedGoals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    if (isTeacherFromNotification && highlightedGoalId && filteredGoals.length > 0) {
      const goalIndex = filteredGoals.findIndex((goal) => goal.id === highlightedGoalId);
      if (goalIndex !== -1) {
        const targetPage = Math.ceil((goalIndex + 1) / goalsPerPage);
        setCurrentPage(targetPage);
      } else {
        console.warn("Không tìm thấy mục tiêu với ID", highlightedGoalId);
      }
    }
  }, [filteredGoals, highlightedGoalId, isTeacherFromNotification]);

  useEffect(() => {
    if (isTeacherFromNotification && highlightedGoalId && goalRefs.current[highlightedGoalId]) {
      goalRefs.current[highlightedGoalId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [filteredGoals, highlightedGoalId, currentPage, isTeacherFromNotification]);

  useEffect(() => {
    if (user?.role === 'student' && !isTeacherFromNotification) {
      localStorage.removeItem('teacherData');
      console.log("Xóa teacherData vì đây là học sinh truy cập trực tiếp");
    }
  }, [user, isTeacherFromNotification]);

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const handleSaveGoal = (newGoal) => {
    const newGoals = [...goals, { ...newGoal, completeStatus: "doing" }];
    updateGoals(newGoals);
    setShowForm(false);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updated = goals.filter((goal) => goal.id !== deletedId);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteId(null);
  };

  const handleUpdateGoal = (updatedGoal) => {
    const updated = goals.map((goal, index) =>
      index === goalToEdit.index ? updatedGoal : goal
    );
    updateGoals(updated);
    setGoalToEdit(null);
    setShowEditForm(false);
  };

  const handleBackToTeacher = () => {
    const teacherData = JSON.parse(localStorage.getItem('teacherData'));
    if (teacherData) {
      setUser({
        username: teacherData.username,
        role: 'teacher',
        user_id: teacherData.user_id,
      });
      localStorage.removeItem('teacherData');
      console.log("Khôi phục vai trò giáo viên:", teacherData);
    } else {
      console.warn("Không tìm thấy thông tin giáo viên trong localStorage");
      navigate('/login');
      return;
    }
    navigate('/notifications');
  };

  const handleCommentClick = (goalId) => {
    setSelectedGoalId(goalId);
    setTagTeacher(true);
  };

  const handleTagTeacherClose = () => {
    setTagTeacher(false);
    setSelectedGoalId(null);
  };

  const handleGoalClick = (goalId) => {
    if (isTeacherFromNotification && goalId === highlightedGoalId) {
      setResponseGoalId(goalId);
      setShowResponseForm(true);
    }
  };

  const handleResponseFormClose = () => {
    setShowResponseForm(false);
    setResponseGoalId(null);
  };

  // Tính toán totalPages
  const totalPages = Math.ceil(filteredGoals.length / goalsPerPage);
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  return (
    <div className="container your-goal-big">
      <div className="your-goal">
        <div className="goal-header">
          <h2>Your Study Goal</h2>
          <span className="add-goal-btn" onClick={() => setShowForm(true)}>
            <img
              src="/src/assets/image/plus.png"
              className="icon_add"
              alt="Add Goal"
            />
          </span>
        </div>

        {isTeacherFromNotification && (
          <button
            onClick={handleBackToTeacher}
            className="back-button"
            style={{
              padding: '10px 20px',
              margin: '10px 0',
              backgroundColor: '#38bdf8',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Quay lại vai trò giáo viên
          </button>
        )}

        {showForm && (
          <GoalForm
            onClose={() => setShowForm(false)}
            onSave={handleSaveGoal}
          />
        )}

        {showEditForm && goalToEdit && (
          <EditGoal
            goal={goalToEdit}
            onClose={() => {
              setGoalToEdit(null);
              setShowEditForm(false);
            }}
            onSave={handleUpdateGoal}
          />
        )}

        {tagTeacher && (
          <TagTeacher
            onClose={handleTagTeacherClose}
            goalId={selectedGoalId}
          />
        )}

        {showResponseForm && responseGoalId && (
          <TeacherResponseForm
            goalId={responseGoalId}
            teacherId={teacherId}
            onClose={handleResponseFormClose}
          />
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
            <tbody>
              {currentGoals.length > 0 ? (
                currentGoals.map((goal, index) => (
                  <tr
                    key={goal.id}
                    ref={(el) => (goalRefs.current[goal.id] = el)}
                    className={isTeacherFromNotification && goal.id === highlightedGoalId ? 'highlight' : ''}
                    onClick={() => handleGoalClick(goal.id)}
                    style={isTeacherFromNotification && goal.id === highlightedGoalId ? { cursor: 'pointer' } : {}}
                  >
                    <td>{goal.course}</td>
                    <td>{goal.goals}</td>
                    <td>{goal.courseExpectations}</td>
                    <td>{goal.teacherExpectations}</td>
                    <td>{goal.selfExpectations}</td>
                    <td>
                      <span
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            const updatedGoal = await updateGoalStatus(
                              goal.id,
                              goal.completeStatus === "done" ? "doing" : "done"
                            );
                            const realIndex = goals.findIndex((g) => g.id === goal.id);
                            const updatedGoals = [...goals];
                            updatedGoals[realIndex].completeStatus = updatedGoal.completeStatus;
                            updateGoals(updatedGoals);
                          } catch (error) {
                            console.error("Error toggling complete status:", error);
                          }
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: goal.completeStatus === "done" ? "#28a745" : "#ffc107",
                          color: "white",
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                      >
                        {goal.completeStatus === "done" && (
                          <i className="fa-solid fa-check"></i>
                        )}
                      </span>
                    </td>
                    <td>{goal.dueDate}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <i
                        className="fa-regular fa-clock"
                        title="View time"
                        onClick={() => alert("View time clicked")}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      ></i>
                      <i
                        className="fa-regular fa-pen-to-square"
                        title="Edit"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={async () => {
                          try {
                            const goalData = await getGoal(goal.id);
                            const realIndex = goals.findIndex((g) => g.id === goal.id);
                            setGoalToEdit({ ...goalData, index: realIndex });
                            setShowEditForm(true);
                          } catch (error) {
                            console.error("Failed to fetch goal:", error);
                          }
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        title="Delete"
                        onClick={async () => {
                          try {
                            await getGoal(goal.id);
                            setGoalToDeleteId(goal.id);
                            setShowDeletePopup(true);
                          } catch (error) {
                            console.error("Failed to fetch goal:", error);
                          }
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                      <i
                        className="fa-regular fa-comment"
                        style={{ color: "#007bff", cursor: "pointer" }}
                        title="Comment"
                        onClick={() => handleCommentClick(goal.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No goals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {showDeletePopup && (
        <DeleteGoal
          id={goalToDeleteId}
          onDeleteSuccess={handleDeleteSuccess}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
}