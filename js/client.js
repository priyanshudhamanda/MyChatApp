
//user interface.
const socket = io("http://localhost:8000");

//variables
const form = document.getElementById("sendContainer");
const MessageInput = document.getElementById("InpMessage");
const MessageBox = document.querySelector(".container");
const sendSound=new Audio('popsound.mp3');
const popSound=new Audio('noti.mp3');
//function
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("messageBox");
  messageElement.classList.add(position);
  MessageBox.appendChild(messageElement);
};



//getting user name.
const n = prompt("Enter Your Name: ");

//if new user joined the chat then emit it to server.
socket.emit("new-user-joined", n);

//handle user joined event.
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "left");
});

//if user press send btn
form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendSound.play();
  const message = MessageInput.value;
  append(`You: ${message}`, "right");

  //if user send message then emit it to server.
  socket.emit("send", message);
  MessageInput.value = "";
});

//handle the receive event.
socket.on("receive", (data) => {
  popSound.play();
  append(`${data.name}: ${data.message}`, "left");
});

//handle the user left event.
socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
