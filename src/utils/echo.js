// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import { getUser } from "../services/auth/authService";

// window.Pusher = Pusher;
// const user = getUser();
// console.log("Test token hehe: ", user.token);
// console.log(localStorage.getItem("user"));
// console.log(localStorage.getItem("user")?.token);
// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "13bd0c990c54a9589eaf",
//   cluster: "ap1",
//   forceTLS: true,
//   encrypted: true,
//   logToConsole: true,
//   authEndpoint: "http://localhost:8000/broadcasting/auth",
//   auth: {
//     headers: {
//       Authorization: `Bearer ${user.token}`
//     }
//   }
// });

// echo.connector.pusher.connection.bind("connected", () => {
//   console.log("✅ Pusher connected!");
// });

// echo.connector.pusher.connection.bind("error", (error) => {
//   console.error("❌ Pusher error:", error);
// });

// echo.connector.pusher.connection.bind("state_change", (states) => {
//   console.log(`🔄 Connection state: ${states.previous} -> ${states.current}`);
// });

// echo.connector.pusher.connection.bind("disconnected", () => {
//   console.warn("⚠️ Pusher disconnected!");
// });

// // echo.private(`user.${63}`)
// //     .subscribed(() => console.log("✅ Subscribed"))
// //     .listen(".announcement.created", (e) => {
// //         console.log("📢 Event received:", e);
// //     });

// // const channel = echo.private(`user.${63}`);

// // channel.subscribed(() => {
// //   console.log("✅ Subscribed to private channel user.63");
// // }).listen('.announcement.created', (e) => {
// //   console.log("📢 Event received!", e); 
// // }).error((err) => {
// //   console.error("❌ Subscription error:", err);
// // });


// export default echo;


import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getUser } from "../services/auth/authService";

window.Pusher = Pusher;

let echo = null;

const user = getUser();

if (user && user.token) {
  console.log("✅ Token found:", user.token);

  echo = new Echo({
    broadcaster: "pusher",
    key: "13bd0c990c54a9589eaf",
    cluster: "ap1",
    forceTLS: true,
    encrypted: true,
    logToConsole: true,
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  });

  echo.connector.pusher.connection.bind("connected", () => {
    console.log("✅ Pusher connected!");
  });

  echo.connector.pusher.connection.bind("error", (error) => {
    console.error("❌ Pusher error:", error);
  });

  echo.connector.pusher.connection.bind("state_change", (states) => {
    console.log(`🔄 Connection state: ${states.previous} -> ${states.current}`);
  });

  echo.connector.pusher.connection.bind("disconnected", () => {
    console.warn("⚠️ Pusher disconnected!");
  });

} else {
  console.warn("❌ No user or token found. Echo not initialized.");
}

export default echo;
