describe("Sign In", () => {
  it("passes", () => {
    cy.visit("/signin");

    cy.get("input[name=name]").type("Tey");

    cy.get("input[name=password]").type("123456");

    cy.get("h2").should("contain", "Sign in to your account");

    cy.get(".chakra-button").contains("Sign in").click();

    cy.contains("Logged by Tey");
  });

  it("not passes", () => {
    cy.visit("/signin");

    cy.get("input[name=name]").type("Tey");

    cy.get("input[name=password]").type("111");

    cy.get("h2").should("contain", "Sign in to your account");

    cy.get(".chakra-button").contains("Sign in").click();

    cy.get("button").contains("Sign in");
  });
});
