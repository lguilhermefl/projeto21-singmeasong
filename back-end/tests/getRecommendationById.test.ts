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

  it("should return 200 and an recommendation with the id sent", async () => {
    const recommendation = await createRecommendationFactory.insert();

    const response = await request(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(recommendation);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
