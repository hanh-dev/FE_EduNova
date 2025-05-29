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
                    setError("Không tìm thấy thắc mắc cho mục tiêu này.");
                }
            } catch (err) {
                console.error("Lỗi khi lấy thắc mắc:", err);
                setError("Không thể lấy thắc mắc. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [goalId, teacherId]);

    const handleSubmit = async () => {
        if (!response.trim()) {
            alert("Vui lòng nhập phản hồi!");
            return;
        }
        if (response.length > 1000) {
            alert("Phản hồi không được vượt quá 1000 ký tự!");
            return;
        }
        if (!tagId) {
            alert("Không tìm thấy thắc mắc để phản hồi!");
            return;
        }

        try {
            const result = await sendTeacherResponse(tagId, response);
            console.log("Send response result:", result);
            alert("Phản hồi đã được gửi!");
            setResponse("");
            onClose();
        } catch (err) {
            console.error("Lỗi khi gửi phản hồi:", err);
            alert("Gửi phản hồi thất bại. Vui lòng thử lại.");
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
                <h2>Phản hồi thắc mắc</h2>
                {loading ? (
                    <p>Đang tải...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Thắc mắc của sinh viên:</label>
                            <textarea value={question} readOnly rows="4" />
                        </div>
                        <div className="form-group">
                            <label>Phản hồi của bạn:</label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="Nhập phản hồi..."
                                rows="4"
                                maxLength={1000}
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={onClose}>Hủy</button>
                            <button onClick={handleSubmit} disabled={!response.trim()}>
                                Gửi
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherResponseForm;