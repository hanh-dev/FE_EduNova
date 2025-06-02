import { useEffect } from 'react';
import echo from './echo';
const useStudentNotifications = (userId, callback) => {
  useEffect(() => {
    const channel = echo.private(`user.${userId}`);
    channel.listen('.weekly.student.notification', callback);

    return () => {
      echo.leave(`user.${userId}`);
    };
  }, [userId, callback]);
};

export default useStudentNotifications;
