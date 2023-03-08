let users = { girish1: "pass", girish2: "pass" };

const registerUser = (data) => {
  if (users[data.username]) {
    return { status: false };
  }
  users[data.username] = data.password;
  return { status: true };
};

const loginUser = (data) => {
  return {
    status: users[data.username] === data.password,
    username: data.username,
  };
};

module.exports = { registerUser, loginUser };
