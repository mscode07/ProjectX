import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ram = await prisma.user.upsert({
    where: { email: "ram@gmail.com" },
    update: {},
    create: {
      name: "Ram",
      email: "ram@gmail.com",
      username: "ram",
      password: "ram",
    },
  });

  const lakshman = await prisma.user.upsert({
    where: { email: "lakshman@gmail.com" },
    update: {},
    create: {
      name: "Lakshman",
      email: "lakshman@gmail.com",
      username: "lakshman",
      password: "lakshman",
    },
  });

  const sita = await prisma.user.upsert({
    where: { email: "site@gmail.com" },
    update: {},
    create: {
      name: "Sita",
      email: "sita@gamil.com",
      username: "sita",
      password: "sita",
    },
  });
  console.log(ram, sita, lakshman);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
