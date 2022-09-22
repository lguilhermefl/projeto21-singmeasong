import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";

export function generate() {
  return {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };
}

export async function insert() {
  const recommendation = generate();
  return await prisma.recommendation.create({ data: recommendation });
}
