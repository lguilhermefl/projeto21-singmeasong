import { prisma } from "../../src/database";
import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export function generate(): CreateRecommendationData {
  return {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };
}

export async function insert(recommendation: CreateRecommendationData) {
  return await prisma.recommendation.create({ data: recommendation });
}

export function generateWithInvalidYouTubeUrl() {
  return {
    name: faker.music.songName(),
    youtubeLink: "https://vimeo.com/750095839",
  };
}

export function generateWithEmptyName() {
  return {
    name: "",
    youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
  };
}