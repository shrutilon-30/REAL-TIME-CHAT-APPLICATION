const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve frontend files from the "public" folder
app.use(express.static("public"));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("🔵 A user connected");

  // Listen for messages
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // send to all connected clients
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected");
  });
});

// Start the server
http.listen(3000, () => {
  console.log("🚀 Server is running at http://localhost:3000");
});
