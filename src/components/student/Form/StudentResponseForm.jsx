// import React, { useState, useEffect, useRef } from "react";
// import {
//     getTeachers,
//     getStudentResponses,
//     sendTagTeacher,
//     markResponseAsRead,
// } from "../../../services/api/StudentAPI";
// import { useAuth } from "../../../services/providers/AuthContext";
// import "./StudentResponseForm.css";

// const StudentResponseForm = ({ goalId, studentId, onClose }) => {
//     const { user } = useAuth();
//     const [responses, setResponses] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [teacherId, setTeacherId] = useState("");
//     const [teacherList, setTeacherList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const responseData = await getStudentResponses(studentId);
//                 const filteredResponses = responseData.filter(
//                     (resp) => resp.goal_id === goalId
//                 );
//                 setResponses(filteredResponses);

//                 const teacherData = await getTeachers();
//                 setTeacherList(teacherData.data);

//                 filteredResponses.forEach((resp) => {
//                     if (!resp.is_read && resp.teacher_response) {
//                         markResponseAsRead(resp.id);
//                     }
//                 });

//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching data:", err);
//                 setError("Unable to load data. Please try again.");
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [goalId, studentId]);

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [responses]);

//     const handleSendMessage = async () => {
//         if (!teacherId || !newMessage.trim()) {
//             alert("Please select a teacher and enter your question!");
//             return;
//         }
//         if (newMessage.length > 1000) {
//             alert("The message must not exceed 1000 characters!");
//             return;
//         }

//         try {
//             await sendTagTeacher(studentId, teacherId, newMessage, goalId);
//             alert("Your message has been sent!");
//             const updatedResponses = await getStudentResponses(studentId);
//             setResponses(updatedResponses.filter((resp) => resp.goal_id === goalId));
//             setNewMessage("");
//             setTeacherId("");
//         } catch (err) {
//             console.error("Error sending message:", err);
//             alert("Failed to send the message. Please try again.");
//         }
//     };

//     const handleOverlayClick = (e) => {
//         if (e.target.className === "srf-overlay") {
//             onClose();
//         }
//     };

//     return (
//         <div className="srf-overlay" onClick={handleOverlayClick}>
//             <div className="srf-modal">
//                 <h2 className="srf-heading">Questions and Responses</h2>
//                 {loading ? (
//                     <p className="srf-loading">Loading...</p>
//                 ) : error ? (
//                     <p className="srf-error">{error}</p>
//                 ) : (
//                     <>
//                         <div className="srf-message-list">
//                             {responses.length > 0 ? (
//                                 <div className="srf-message-container">
//                                     {responses.map((resp) => (
//                                         <div key={resp.id} className="srf-message-item">
//                                             <div className="srf-message-block">
//                                                 <label className="srf-label">{`You (${user.username}) - ${new Date(
//                                                     resp.created_at
//                                                 ).toLocaleString()}`}</label>
//                                                 <textarea
//                                                     value={resp.message}
//                                                     readOnly
//                                                     rows="2"
//                                                     className="srf-textarea srf-student"
//                                                 />
//                                             </div>
//                                             {resp.teacher_response && (
//                                                 <div className="srf-message-block">
//                                                     <label className="srf-label">{`Teacher - ${new Date(
//                                                         resp.created_at
//                                                     ).toLocaleString()}`}</label>
//                                                     <textarea
//                                                         value={resp.teacher_response}
//                                                         readOnly
//                                                         rows="2"
//                                                         className="srf-textarea srf-teacher"
//                                                     />
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                     <div ref={messagesEndRef} />
//                                 </div>
//                             ) : (
//                                 <p className="srf-empty">No questions or responses yet.</p>
//                             )}
//                         </div>

//                         <div className="srf-send-form">
//                             <div className="srf-form-group">
//                                 <label className="srf-label">Send a new question:</label>
//                                 <select
//                                     className="srf-select"
//                                     value={teacherId}
//                                     onChange={(e) => setTeacherId(e.target.value)}
//                                 >
//                                     <option value="">-- Select a teacher --</option>
//                                     {teacherList.map((t) => (
//                                         <option key={t.id} value={t.id}>
//                                             {t.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <textarea
//                                     className="srf-textarea"
//                                     value={newMessage}
//                                     onChange={(e) => setNewMessage(e.target.value)}
//                                     placeholder="Enter your question..."
//                                     rows="4"
//                                     maxLength={1000}
//                                 />
//                             </div>
//                             <div className="srf-button-group">
//                                 <button className="srf-button" onClick={onClose}>Close</button>
//                                 <button
//                                     className="srf-button srf-send"
//                                     onClick={handleSendMessage}
//                                     disabled={!teacherId || !newMessage.trim()}
//                                 >
//                                     Send
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentResponseForm;
import React, { useState, useEffect, useRef } from "react";
import {
  getTeachers,
  getStudentResponses,
  sendTagTeacher,
  markResponseAsRead,
} from "../../../services/api/StudentAPI";
import { useAuth } from "../../../services/providers/AuthContext";
import "./StudentResponseForm.css";

const StudentResponseForm = ({ goalId, studentId, onClose }) => {
  const { user } = useAuth();
  const [responses, setResponses] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!studentId) throw new Error("Student ID is not available");
        const responseData = await getStudentResponses(studentId);
        const filteredResponses = responseData.filter(
          (resp) => resp.goal_id === goalId
        );
        setResponses(filteredResponses);

        const teacherData = await getTeachers();
        setTeacherList(teacherData.data);

        filteredResponses.forEach((resp) => {
          if (!resp.is_read && resp.teacher_response) {
            markResponseAsRead(resp.id);
          }
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to load data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, [goalId, studentId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
    const el = messageInputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!teacherId || !newMessage.trim()) {
      setError("Please select a teacher and enter your question!");
      return;
    }
    if (newMessage.length > 1000) {
      setError("The message must not exceed 1000 characters!");
      return;
    }

    try {
      await sendTagTeacher(studentId, teacherId, newMessage, goalId);
      setError("");
      const updatedResponses = await getStudentResponses(studentId);
      setResponses(updatedResponses.filter((resp) => resp.goal_id === goalId));
      setNewMessage("");
      setTeacherId("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send the message. Please try again.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Questions and Responses</h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="response-list">
              {responses.length > 0 ? (
                <div className="messages-container">
                  {responses.map((resp) => (
                    <div key={resp.id} className="response-item">
                      <div className="form-group">
                        <label>{`You (${user.username}) - ${new Date(
                          resp.created_at
                        ).toLocaleString()}`}</label>
                        <textarea
                          value={resp.message}
                          readOnly
                          className="student-message"
                        />
                      </div>
                      {resp.teacher_response && (
                        <div className="form-group">
                          <label>{`Teacher - ${new Date(
                            resp.created_at
                          ).toLocaleString()}`}</label>
                          <textarea
                            value={resp.teacher_response}
                            readOnly
                            className="teacher-response"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <p>No questions or responses for this goal yet.</p>
              )}
            </div>

            <div className="send-message-form">
              <div className="form-group">
                <label>Send a new question:</label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                >
                  <option value="">Select a teacher</option>
                  {teacherList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <textarea
                  ref={messageInputRef}
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Enter your question or response..."
                  maxLength={1000}
                  className="student-message-1"
                />
              </div>
              <div className="button-group">
                <button onClick={onClose}>Close</button>
                <button
                  onClick={handleSendMessage}
                  disabled={!teacherId || !newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentResponseForm;
