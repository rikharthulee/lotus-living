import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const email = "rikharthulee@gmail.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Set ADMIN_PASSWORD in the environment before running.");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: "admin" },
    create: { email, password: hashed, role: "admin", name: "Admin" },
  });

  console.log(`Admin user ensured for ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
