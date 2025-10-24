import bcrypt from "bcrypt";

const users = [
  {
    name: "Caleb Selormey",
    email: "caselormey2@gmail.com",
    password: bcrypt.hashSync("testuser123", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("testuser123", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("testuser123", 10),
  },
];

export default users;
