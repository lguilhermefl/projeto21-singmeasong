beforeEach(async () => {
  await cy.request("POST", "http://localhost:5000/e2e/reset");
});

describe("Test homepage", () => {
  it("Tests recommendation amount is 10 max", () => {
    cy.populateRecommendations();

    cy.visit("http://localhost:3000/");

    cy.get('[data-cy="name"]').should("have.length", "10");
    cy.url().should("equal", "http://localhost:3000/");
  });
});
