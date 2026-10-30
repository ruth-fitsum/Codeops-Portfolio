import bcrypt from "bcryptjs";

const users = [
  {
    id: "user-001",
    name: "Customer User",
    email: "customer@addiseats.test",
    passwordHash: bcrypt.hashSync("Customer123!", 10),
    role: "customer",
  },
  {
    id: "user-002",
    name: "Staff User",
    email: "staff@addiseats.test",
    passwordHash: bcrypt.hashSync("Staff123!", 10),
    role: "staff",
  },
];

export function verifyCredentials(email, password) {
  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function getUserById(id) {
  const user = users.find((item) => item.id === id);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}