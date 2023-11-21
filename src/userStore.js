users = [
  {
    id: "memoreal@tmax.co.kr",
    username: "tmax",
    password: "1234",
  },
];

const findUserByUsername = (email) => users.find((u) => u.id === email);

module.exports = { users, findUserByUsername };
