import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test get random recommendation", () => {
  it("Tests if it gets 1 random recommendation", () => {
    const recommendation1 = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };
    const recommendation2 = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };

    cy.createRecommendation(recommendation1);
    cy.createRecommendation(recommendation2);

    const propsToUpdate = {
      score: 11,
    };

    cy.updateRecommendation(1, propsToUpdate);

    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/recommendations/random").as("randomRecommendation");
    cy.get('[data-cy="random"]').click();
    cy.wait("@randomRecommendation");

    cy.get('[data-cy="name"]').should("have.length", "1");
    cy.url().should("equal", "http://localhost:3000/random");
  });

  it("Tests try to get random recommendation when there is no recommendation registered", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/recommendations/random").as("randomRecommendation");
    cy.get('[data-cy="random"]').click();
    cy.wait("@randomRecommendation")
      .its("response.statusCode")
      .should("equal", 404);

    cy.contains("Loading...").should("exist");
    cy.url().should("equal", "http://localhost:3000/random");
  });
});
