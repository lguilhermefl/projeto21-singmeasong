import { faker } from "@faker-js/faker";

export function generate() {
  const recommendationInsert = {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };

  const recommendation = {
    id: 1,
    ...recommendationInsert,
    score: 0,
  };

  return { recommendationInsert, recommendation };
}
