import React, { useState, useEffect } from "react";
import { getTagTeacherByGoal, sendTeacherResponse } from "../../../services/api/StudentAPI";
import "./TeacherResponseForm.css";

const TeacherResponseForm = ({ goalId, teacherId, onClose }) => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [tagId, setTagId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getTagTeacherByGoal(goalId, teacherId);
                console.log("Tag data:", data);
                if (data && data.message) {
                    setQuestion(data.message);
                    setTagId(data.id);
                } else {
                    setError("No question found for this goal.");
                }
            } catch (err) {
                console.error("Error fetching question:", err);
                setError("Unable to retrieve question. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [goalId, teacherId]);

    const handleSubmit = async () => {
        if (!response.trim()) {
            alert("Please enter a response!");
            return;
        }
        if (response.length > 1000) {
            alert("Response must not exceed 1000 characters!");
            return;
        }
        if (!tagId) {
            alert("No question found to respond to!");
            return;
        }

        try {
            const result = await sendTeacherResponse(tagId, response);
            console.log("Send response result:", result);
            alert("Response has been sent!");
            setResponse("");
            onClose();
        } catch (err) {
            console.error("Error sending response:", err);
            alert("Failed to send response. Please try again.");
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
                <h2>Respond to Question</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Student's Question:</label>
                            <textarea value={question} readOnly rows="4" />
                        </div>
                        <div className="form-group">
                            <label>Your Response:</label>
                            <textarea
                                value={response}
onChange={(e) => setResponse(e.target.value)}
                                placeholder="Enter your response..."
                                rows="4"
                                maxLength={1000}
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleSubmit} disabled={!response.trim()}>
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherResponseForm;
// import React, { useState, useEffect } from "react";
// import { getTagTeacherByGoal, sendTeacherResponse } from "../../../services/api/StudentAPI";
// import "./TeacherResponseForm.css";

// const TeacherResponseForm = ({ goalId, teacherId, onClose }) => {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");
//   const [tagId, setTagId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const data = await getTagTeacherByGoal(goalId, teacherId);
//         console.log("Tag data:", data);
//         if (data && data.message) {
//           setQuestion(data.message);
//           setTagId(data.id);
//           setResponse(data.teacher_response || "");
//         } else {
//           setError("No question found for this goal.");
//         }
//       } catch (err) {
//         console.error("Error fetching question:", err);
//         setError("Unable to retrieve question. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuestion();
//   }, [goalId, teacherId]);

//   const handleSubmit = async () => {
//     if (!response.trim()) {
//       setError("Please enter a response!");
//       return;
//     }
//     if (response.length > 1000) {
//       setError("Response must not exceed 1000 characters!");
//       return;
//     }
//     if (!tagId) {
//       setError("No question found to respond to!");
//       return;
//     }

//     try {
//       await sendTeacherResponse(tagId, response);
//       setError("");
//       onClose();
//     } catch (err) {
//       console.error("Error sending response:", err);
//       setError("Failed to send response. Please try again.");
//     }
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.className === "modal-overlay") {
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={handleOverlayClick}>
//       <div className="modal-content">
//         <h2>Respond to Question</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : (
//           <>
//             <div className="form-group">
//               <label>Student's Question:</label>
//               <textarea value={question} readOnly rows="4" />
//             </div>
//             <div className="form-group">
//               <label>Your Response:</label>
//               <textarea
//                 value={response}
//                 onChange={(e) => setResponse(e.target.value)}
//                 placeholder="Enter your response..."
//                 rows="4"
//                 maxLength={1000}
//               />
//             </div>
//             <div className="button-group">
//               <button onClick={onClose}>Cancel</button>
//               <button onClick={handleSubmit} disabled={!response.trim()}>
//                 Send
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherResponseForm;
