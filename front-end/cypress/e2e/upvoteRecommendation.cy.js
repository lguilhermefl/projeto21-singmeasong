import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test upvote recommendation", () => {
  it("Tests upvote recommendation with success", () => {
    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=z4HihGFLEdM",
    };

    cy.createRecommendation(recommendation);

    cy.visit("http://localhost:3000/");

    cy.intercept("POST", "/recommendations/1/upvote").as(
      "upvoteRecommendation"
    );
    cy.get('[data-cy="upvote"]').click();
    cy.wait("@upvoteRecommendation");

    cy.get('[data-cy="score"]').should("have.text", "1");
    cy.url().should("equal", "http://localhost:3000/");
  });
});
