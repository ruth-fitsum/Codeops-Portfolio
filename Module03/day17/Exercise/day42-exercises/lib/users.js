import bcrypt from "bcryptjs";

const usersPromise = Promise.all([
  {
    id: "user-001",
    name: "Demo Customer",
    email: "customer@addiseats.test",
    password: "Customer123!",
    role: "customer",
  },
  {
    id: "user-002",
    name: "Demo Staff",
    email: "staff@addiseats.test",
    password: "Staff123!",
    role: "staff",
  },
].map(async (user) => {
  const passwordHash = await bcrypt.hash(user.password, 10);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash,
    role: user.role,
  };
}));

export async function verifyCredentials(email, password) {
  const users = await usersPromise;

  const user = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function getUserById(id) {
  const users = await usersPromise;
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