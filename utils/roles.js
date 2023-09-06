function isAdmin(user) {
  return user.role === "admin";
}

function isUser(user) {
  return user.role === "user";
}

module.exports = { isAdmin, isUser };
