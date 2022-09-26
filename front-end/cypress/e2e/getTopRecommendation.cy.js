import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test get top recommendations", () => {
  it("Tests if it get recommendations ordered by higher score", () => {
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

    cy.intercept("GET", "/recommendations/top/10").as("topRecommendations");
    cy.get('[data-cy="top"]').click();
    cy.wait("@topRecommendations");

    cy.get('[data-cy="name"]')
      .first()
      .should("have.text", recommendation1.name);
    cy.get('[data-cy="score"]')
      .first()
      .should("have.text", propsToUpdate.score);
    cy.url().should("equal", "http://localhost:3000/top");
  });

  it("Tests try to get top recommendations when there is no recommendation registered", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/recommendations/top/10").as("topRecommendations");
    cy.get('[data-cy="top"]').click();
    cy.wait("@topRecommendations");

    cy.contains("No recommendations yet! Create your own :)").should("exist");
    cy.url().should("equal", "http://localhost:3000/top");
  });

  it("Tests if get top recommendations has a maximum 10 recommendations returned", () => {
    cy.populateRecommendations();

    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/recommendations/top/10").as("topRecommendations");
    cy.get('[data-cy="top"]').click();
    cy.wait("@topRecommendations");

    cy.get('[data-cy="name"]').should("have.length", "10");
    cy.url().should("equal", "http://localhost:3000/top");
  });
});
