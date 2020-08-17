let users = [];

// Join user to chat
function joinUser(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get user
function getUser(id) {
  return users.find(user => user.id === id);
}

// User left
function leaveUser(id) {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  joinUser,
  getUser,
  leaveUser,
  getRoomUsers
};
