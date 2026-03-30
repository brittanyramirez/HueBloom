describe("Login flow", () => {
  it("logs in a main user and redirects to the dashboard", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("Password123");
    cy.contains("button", "Sign In").click();

    cy.url().should("include", "/dashboard");
  });
});