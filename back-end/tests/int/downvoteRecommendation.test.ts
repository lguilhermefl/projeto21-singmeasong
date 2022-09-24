import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../../src/database";
import app from "../../src/app";
import request from "supertest";

describe("/POST /recommendations/:id/downvote", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 200 and the recommendation score equals to -1", async () => {
    const recommendation = await createRecommendationFactory.insert();

    await request(app).post(`/recommendations/${recommendation.id}/downvote`);
    const response = await request(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.score).toBe(-1);
  });

  it("should return 404 when recommendation id doesn't exist", async () => {
    const response = await request(app).post("/recommendations/0/downvote");

    expect(response.status).toBe(404);
  });

  it("should remove recommendation id with previous score equals to -5 and return 404", async () => {
    const recommendation = await createRecommendationFactory.insert();

    await prisma.recommendation.update({
      where: { id: recommendation.id },
      data: { score: -5 },
    });

    await request(app).post(`/recommendations/${recommendation.id}/downvote`);

    const response = await request(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
