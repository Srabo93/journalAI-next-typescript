import { PrismaClient } from "@prisma/client";

interface CustomGlobal {
  prisma?: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as CustomGlobal).prisma) {
    (global as CustomGlobal).prisma = new PrismaClient();
  }
  prisma = (global as CustomGlobal).prisma!;
}

export default prisma;
