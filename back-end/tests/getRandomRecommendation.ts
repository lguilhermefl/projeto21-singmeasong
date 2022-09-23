import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../src/database";
import app from "../src/app";
import request from "supertest";

describe("GET /recommendations/random", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 404 when no recommendation is found", async () => {
    const response = await request(app).get("/recommendations/random");

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
