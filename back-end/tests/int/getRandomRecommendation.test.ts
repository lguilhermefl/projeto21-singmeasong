import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../../src/database";
import { jest } from "@jest/globals";
import app from "../../src/app";
import request from "supertest";

describe("GET /recommendations/random", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 200 and one random recommendation with score less than or equal to 10", async () => {
    const recommendation = await createRecommendationFactory.insert();
    await createRecommendationFactory.insert();
    await createRecommendationFactory.insert();

    await prisma.recommendation.update({
      where: { id: recommendation.id },
      data: { score: 11 },
    });

    jest.spyOn(Math, "random").mockImplementationOnce((): any => 0.7);

    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.score).toBeLessThanOrEqual(10);
  });

  it("should return 200 and one random recommendation with score greater than 10", async () => {
    const recommendation1 = await createRecommendationFactory.insert();
    const recommendation2 = await createRecommendationFactory.insert();
    await createRecommendationFactory.insert();

    await prisma.recommendation.update({
      where: { id: recommendation1.id },
      data: { score: 11 },
    });
    await prisma.recommendation.update({
      where: { id: recommendation2.id },
      data: { score: 15 },
    });

    jest.spyOn(Math, "random").mockImplementationOnce((): any => 0.69);

    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.score).toBeGreaterThan(10);
  });

  it("should return 200 and one recommendation with score higher than 10 when there is no recommendation with score less than or equal to 10", async () => {
    const recommendation = await createRecommendationFactory.insert();

    await prisma.recommendation.update({
      where: { id: recommendation.id },
      data: { score: 11 },
    });

    jest.spyOn(Math, "random").mockImplementationOnce((): any => 0.7);

    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.score).toBeGreaterThan(10);
  });

  it("should return 200 and one recommendation with score less or equal than 10 when there is no recommendation with score greater than 10", async () => {
    const recommendation = await createRecommendationFactory.insert();

    await prisma.recommendation.update({
      where: { id: recommendation.id },
      data: { score: 10 },
    });

    jest.spyOn(Math, "random").mockImplementationOnce((): any => 0.69);

    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.score).toBeLessThanOrEqual(10);
  });

  it("should return 404 when there is no recommendation in database", async () => {
    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
