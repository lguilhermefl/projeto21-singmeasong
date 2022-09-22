import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";

export default function insert() {
  const recommendation = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };

  return prisma.recommendation.create({ data: recommendation });
}
