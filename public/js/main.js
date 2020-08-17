const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");

// Get username and the room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Listen to Rooms and Users changes
socket.on("roomUsers", ({ room, users }) => {
  outputRoom(room);
  outputUsers(users);
});

// Receive Message
socket.on("message", message => {
  // Display the message
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear inputs
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Display a message
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                  <p class="text">
                    ${message.text}
                  </p>`;
  chatMessages.appendChild(div);
}

// Add room and users to DOM
function outputUsers(users) {
  usersList.innerHTML = "";
  if (users.length) {
    users.map(user => (usersList.innerHTML += `<li>${user.username}</li>`));
  }
}

function outputRoom(room) {
  roomName.innerText = room;
}
