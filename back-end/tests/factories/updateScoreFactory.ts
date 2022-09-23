import { prisma } from "../../src/database";

export async function updateScore(
  id: number,
  operation: "increment" | "decrement"
) {
  return prisma.recommendation.update({
    where: { id },
    data: {
      score: { [operation]: 1 },
    },
  });
}
