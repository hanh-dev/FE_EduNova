// utils/notificationListener.js
import echo from "./echo";

let isSubscribed = false;

export function subscribeToNotification(userId, onReceive) {
  if (isSubscribed) return;

  const channel = echo.private(`user.${userId}`);
  console.log(`🎧 Subscribed to user.${userId}`);

  channel.listen('.weekly.student.notification', (data) => {
    console.log("📥 Nhận thông báo mới:", data);
    onReceive(data);
  });

  isSubscribed = true;
}