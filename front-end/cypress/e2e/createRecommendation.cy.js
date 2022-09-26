import { faker } from "@faker-js/faker";

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
  });
});
