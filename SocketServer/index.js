//socket server
const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

const user = {};

io.on("connection", (socket) => {
  //handle the new user joined event.
  socket.on("new-user-joined", (name) => {
    //console.log("new user: ", name);
    user[socket.id] = name;
    //when user joined then broadcast to all users.
    socket.broadcast.emit("user-joined", name);
  });

  //handle the user send a message event.
  socket.on("send", (message) => {
    //when user send message broadcast it to all users.
    socket.broadcast.emit("receive", {
      message: message,
      name: user[socket.id],
    });
  });

  //if someone left the chat.
  socket.on("disconnect", (message) => {
    //if someone leave the chat broadcast it to all users.
    socket.broadcast.emit("left", user[socket.id]);
    delete user[socket.id];
  });
});
