const socket = io('/main');
let roomCode;

const displayChatMessage = (msg) => {
  const output = document.querySelector("#messager");
  const pe = document.createElement("p");
  pe.textContent = msg;
  output.appendChild(pe);
};

const joinButton = document.getElementById("join-button");
joinButton.addEventListener("click", () => {
  roomCode = prompt('input the joincode');
  if (roomCode.length === 6) {
    socket.emit("join", roomCode);
    displayChatMessage("You've joined the room: " + roomCode);
    console.log('userconnected', roomCode);
  } else {
    displayChatMessage("Room code must be 6 digits ,Refresh the browser page to start over");
  }
 
});

socket.on("chat message", (msg) => {
  displayChatMessage(msg);
});

const input = document.querySelector("#input");
const sendButton = document.querySelector("#send-button");
sendButton.addEventListener('click', (event) => {
  event.preventDefault();
  const msg = input.value;
  if (msg.length === 0) {
    socket.emit("chat message","");
  } else {
    socket.emit("chat message", msg, roomCode);
  }
  input.value = "";
  return false;
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const msg = input.value;
  if (msg.length === 0) {
    socket.emit("chat message","");
  } else {
    socket.emit("chat message", msg, roomCode);
  }
  input.value = "";
  return false;
});