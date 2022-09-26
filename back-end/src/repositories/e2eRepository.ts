import { prisma } from "../database.js";

export async function reset() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
  ]);
}

export async function update(id: number, propsToUpdate: any) {
  await prisma.recommendation.update({
    where: {
      id,
    },
    data: propsToUpdate,
  });
}
