import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../../src/database";
import app from "../../src/app";
import request from "supertest";

describe("GET /recommendations", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 200 and an array of 2 recommendation objects ordered by id desc", async () => {
    const recommendation1 = await createRecommendationFactory.insert();
    const recommendation2 = await createRecommendationFactory.insert();

    const arrayRecommendations = [recommendation2, recommendation1];
    const response = await request(app).get("/recommendations");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(arrayRecommendations);
  });

  it("should return 200 and an array of 10 max recommendations objects ordered by id desc", async () => {
    await createRecommendationFactory.populate();

    const response = await request(app).get("/recommendations");

    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(10);
    expect(response.body[0].id).toBeGreaterThan(response.body[1].id);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
