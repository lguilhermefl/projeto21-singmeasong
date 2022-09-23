import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../src/database";
import app from "../src/app";
import request from "supertest";

describe("GET /recommendations/top/:amount", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
  });

  it("should return 200 and an array of 2 recommendation objects ordered by score desc", async () => {
    const createdRecommendation1 = await createRecommendationFactory.insert();
    const createdRecommendation2 = await createRecommendationFactory.insert();

    const arrayCreatedRecommendations = [
      createdRecommendation2,
      createdRecommendation1,
    ];
    const response = await request(app).get("/recommendations");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(arrayCreatedRecommendations);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
