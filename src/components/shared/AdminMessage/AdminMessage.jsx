import { useEffect, useState } from 'react';
import { ref, onChildAdded, get } from 'firebase/database';
import { api } from '../../../utils/constants';
import './AdminMessage.css';
import { database } from '../../../firebase';
import { getStudents } from '../../../services/api/StudentAPI';

const AdminMessage = () => {
    const [conversations, setConversations] = useState({});
    const [users, setUsers] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getStudents();
                console.log('Users from API:', response);
                const mappedUsers = {};
                response.forEach(student => {
                    mappedUsers[student.id] = student;
                });
                console.log('Mapped users:', mappedUsers);
                setUsers(mappedUsers);
            } catch (error) {
                console.error('Error loading students from API:', error);
            }
        };

        fetchUsers();

        // Tải tất cả các cuộc trò chuyện từ Firebase
        const conversationsRef = ref(database, 'conversations');
        get(conversationsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const conversationsData = snapshot.val();
                console.log('Initial conversations loaded:', conversationsData);
                setConversations(conversationsData);
            } else {
                console.log('No conversations found in Firebase');
            }
        }).catch((error) => {
            console.error('Error loading initial conversations:', error);
        });

        // Lắng nghe cuộc trò chuyện mới
        const unsubscribeConversations = onChildAdded(conversationsRef, (snapshot) => {
            const studentId = snapshot.key;
            const studentConversations = snapshot.val();
            console.log('New conversation added:', { studentId, messages: studentConversations });

            setConversations((prev) => ({
                ...prev,
                [studentId]: studentConversations,
            }));

            // Lắng nghe tin nhắn mới trong cuộc trò chuyện
            const messagesRef = ref(database, `conversations/${studentId}/messages`);
            const unsubscribeMessages = onChildAdded(messagesRef, (messageSnapshot) => {
                const message = messageSnapshot.val();
                const messageKey = messageSnapshot.key;
                console.log('New message received:', { studentId, key: messageKey, ...message });

                setConversations((prev) => ({
                    ...prev,
                    [studentId]: {
                        ...prev[studentId],
                        messages: {
                            ...(prev[studentId]?.messages || {}),
                            [messageKey]: message,
                        },
                    },
                }));
            }, (error) => {
                console.error('Error listening to messages for student:', studentId, error);
            });

            return () => unsubscribeMessages();
        }, (error) => {
            console.error('Error listening to conversations:', error);
        });

        return () => unsubscribeConversations();
    }, []);

    const handleReply = async (studentId) => {
        if (!replyContent) return;
        try {
            await api.post('/v1/messages/reply', {
                student_id: studentId,
                content: replyContent,
            });
            setReplyContent('');
        } catch (error) {
            console.error('Failed to send reply:', error);
            alert('Gửi tin nhắn trả lời thất bại.');
        }
    };

    const handleImageError = (e, defaultImage) => {
        console.error('Failed to load image:', e.target.src);
        e.target.src = defaultImage; // Hiển thị hình ảnh mặc định nếu lỗi
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const selectStudent = (studentId) => setSelectedStudentId(studentId);

    return (
        <div className="dashboard-container">
            <button onClick={toggleChat} className="chat-toggle-button">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h2 className="chat-title">Message to student</h2>
                        <button onClick={toggleChat} className="student-chat-close">
                            <svg className="student-chat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="chat-content">
                        <div className="student-list">
                            {Object.keys(conversations).length === 0 ? (
                                <p className="empty-message">Chưa có tin nhắn nào.</p>
                            ) : (
                                Object.keys(conversations).map((studentId) => (
                                    <div
                                        key={studentId}
                                        onClick={() => selectStudent(studentId)}
                                        className={`student-item ${selectedStudentId === studentId ? 'active' : ''}`}
                                    >
                                        <img
                                            src={users[studentId]?.image || 'https://i.pravatar.cc/40?img=12'}
                                            alt="Avatar"
                                            className="avatar"
                                            onError={(e) => handleImageError(e, 'https://i.pravatar.cc/40?img=12')}
                                        />
                                        <div>
                                            <p className="student-name">{users[studentId]?.name || `Sinh viên ${studentId}`}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="chat-box">
                            {selectedStudentId ? (
                                <>
                                    <div className="chat-history">
                                        {conversations[selectedStudentId]?.messages ? (
                                            Object.entries(conversations[selectedStudentId].messages).map(([messageId, message]) => (
                                                <div key={messageId} className={`message-row ${message.sender === 'admin' ? 'admin' : 'student'}`}>
                                                    <div className={`message-bubble ${message.sender === 'admin' ? 'admin-bubble' : 'student-bubble'}`}>
                                                        <div className="message-header">
                                                            <img
                                                                src={message.image || 'https://i.pravatar.cc/40?img=12'}
                                                                alt={`${message.sender} Avatar`}
                                                                className="message-avatar"
                                                                onError={(e) => handleImageError(e, 'https://i.pravatar.cc/40?img=12')}
                                                            />
                                                            <span className="message-name">
                                                                {message.sender === 'admin' ? 'Admin' : (users[selectedStudentId]?.name || `Sinh viên ${selectedStudentId}`)}
                                                            </span>
                                                        </div>
                                                        <p>{message.content}</p>
                                                        <span className="message-time">{message.created_at}</span>
                                                        {message.read_at && (
                                                            <span className="message-read">Đã xem lúc {message.read_at}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="empty-message">Chưa có tin nhắn.</p>
                                        )}
                                    </div>

                                    <div className="chat-input">
                                        <textarea
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Enter your message..."
                                            className="input-textarea"
                                            rows="2"
                                        />
                                        <button
                                            onClick={() => handleReply(selectedStudentId)}
                                            className="send-button"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="no-student-selected">
                                    <p className="empty-message">Chọn sinh viên để bắt đầu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessage;