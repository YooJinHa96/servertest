const { v4: uuidv4 } = require("uuid");
users = [
  {
    id: "memoreal@tmax.co.kr",
    username: "tmax",
    password: "1234",
    secrey_key: uuidv4(),
  },
];

const findUserByUsername = (email) => users.find((u) => u.id === email);

module.exports = { users, findUserByUsername };
