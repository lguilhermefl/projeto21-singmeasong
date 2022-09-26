import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test downvote recommendation", () => {
  it("Tests downvote recommendation with success", () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };

    cy.createRecommendation(recommendation);

    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "/recommendations/1/downvote").as(
      "downvoteRecommendation"
    );
    cy.get('[data-cy="downvote"]').click();
    cy.wait("@downvoteRecommendation");

    cy.get('[data-cy="score"]').should("have.text", "-1");
  });

  it("Tests if downvote recommendation with score -5 is removed", () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };
    const propsToUpdate = {
      score: -5,
    };

    cy.createRecommendation(recommendation);
    cy.updateRecommendation(1, propsToUpdate);

    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "/recommendations/1/downvote").as(
      "downvoteRecommendation"
    );
    cy.get('[data-cy="downvote"]').click();
    cy.wait("@downvoteRecommendation");

    cy.contains(recommendation.name).should("not.exist");
  });
});
