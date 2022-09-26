import { prisma } from "../database.js";
import { faker } from "@faker-js/faker";

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

export async function populate() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
      {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
      },
    ],
    skipDuplicates: true,
  });
}
