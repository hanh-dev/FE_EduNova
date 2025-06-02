import { useEffect } from 'react';
import echo from '../utils/echo';

const useStudentNotifications = (userId, setNotifications, setTotalUnread) => {
  useEffect(() => {
    if (!userId) return;

    const channel = echo.private(`user.${userId}`);
    console.log(`🎧 Listening to user.${userId}`);

    channel.listen('.weekly.student.notification', (data) => {
      console.log('📥 Nhận thông báo mới:', data);

      const newNotification = {
        ...data.content,
        isUnread: true,
      };

      setNotifications(prev => [newNotification, ...prev]);
      setTotalUnread(prev => prev + 1);
    });

    return () => {
      echo.leave(`user.${userId}`);
    };
  }, [userId, setNotifications, setTotalUnread]);
};

export default useStudentNotifications;
