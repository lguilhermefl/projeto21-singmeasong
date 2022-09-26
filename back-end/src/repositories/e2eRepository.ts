import { prisma } from "../database.js";

export async function reset() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
}