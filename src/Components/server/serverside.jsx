//server side
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const forms = [
  { id: 1, name: "Form 1" },
  { id: 2, name: "Form 2" },
  { id: 3, name: "Form 3" },
];

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send the list of forms to the client
  socket.emit("forms_updated", forms);

  // Handle the "get_forms" event from the client
  socket.on("get_forms", () => {
    socket.emit("forms_updated", forms);
  });

  // Handle the "view_form" event from the client
  socket.on("view_form", (formId) => {
    console.log(`User viewed form ${formId}`);
    io.emit("user_viewed_form", formId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 12345;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});