import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test create recommendation", () => {
  it("Tests create recommendation with success", () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };

    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="name-create"]').type(recommendation.name);
    cy.get('[data-cy="url-create"]').type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get('[data-cy="button-create"]').click();
    cy.wait("@createRecommendation");

    cy.contains(recommendation.name).should("be.visible");
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("Tests try to create recommendation with duplicate name", () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };

    cy.createRecommendation(recommendation);

    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="name-create"]').type(recommendation.name);
    cy.get('[data-cy="url-create"]').type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get('[data-cy="button-create"]').click();
    cy.wait("@createRecommendation")
      .its("response.statusCode")
      .should("equal", 409);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Error creating recommendation!");
    });
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("Tests try to create recommendation without any field filled", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get('[data-cy="button-create"]').click();
    cy.wait("@createRecommendation")
      .its("response.statusCode")
      .should("equal", 422);

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Error creating recommendation!");
    });
    cy.url().should("equal", "http://localhost:3000/");
  });
});
