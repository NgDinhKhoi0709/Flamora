import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoUsers = [
  {
    name: "Flamora Admin",
    email: "admin@flamora.vn",
    password: "Admin123!",
    role: "admin",
  },
  {
    name: "Gia Bao",
    email: "user@gmail.com",
    password: "User123!",
    role: "user",
  },
];

async function main() {
  for (const user of demoUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        passwordHash,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        role: user.role,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
