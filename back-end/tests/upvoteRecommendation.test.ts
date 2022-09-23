import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../src/database";
import app from "../src/app";
import request from "supertest";

describe("GET /recommendations", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 200 and the recommendation score equals to 1", async () => {
    const recommendation = await createRecommendationFactory.insert();

    await request(app).post(`/recommendations/${recommendation.id}/upvote`);
    const response = await request(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.score).toBe(1);
  });

  it("should return 404 when recommendation id doesn't exist", async () => {
    const response = await request(app).post("/recommendations/0/upvote");

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
