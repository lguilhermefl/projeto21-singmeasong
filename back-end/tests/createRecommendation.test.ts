import * as createRecommendationFactory from "./factories/createRecommendationFactory";
import { prisma } from "../src/database";
import app from "../src/app";
import request from "supertest";

describe("POST /recommendations", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY`,
    ]);
  });

  it("should return 201 when a valid recommendation is sent", async () => {
    const recommendation = createRecommendationFactory.generate();
    const response = await request(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(201);
  });

  it("should return 422 when recommendation with empty name prop is sent", async () => {
    const recommendation = createRecommendationFactory.generateWithEmptyName();
    const response = await request(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(422);
  });

  it("should return 422 when recommendation with a invalid YouTube url is sent", async () => {
    const recommendation =
      createRecommendationFactory.generateWithInvalidYouTubeUrl();
    const response = await request(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(422);
  });

  it("should return 409 when recommendation name already exists", async () => {
    const recommendation = createRecommendationFactory.generate();

    await createRecommendationFactory.insert(recommendation);
    const response = await request(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(409);
    expect(response.text).toBe("Recommendations names must be unique");
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
