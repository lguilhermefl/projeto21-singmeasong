Cypress.Commands.add("createRecommendation", (recommendation) => {
  cy.request(
    "POST",
    "http://localhost:5000/recommendations",
    recommendation
  ).then(() => {
    cy.visit("http://localhost:3000/");
  });
});

Cypress.Commands.add("updateRecommendation", (id, propsToUpdate) => {
  cy.request(
    "POST",
    `http://localhost:5000/e2e/${id}/update`,
    propsToUpdate
  ).then(() => {
    cy.visit("http://localhost:3000/");
  });
});

Cypress.Commands.add("populateRecommendations", () => {
  cy.request("POST", "http://localhost:5000/e2e/populate").then(() => {
    cy.visit("http://localhost:3000/");
  });
});
