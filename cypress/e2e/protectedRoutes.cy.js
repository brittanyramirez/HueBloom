describe("Protected routes", () => {
  it("redirects unauthenticated users to login", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
  });
});