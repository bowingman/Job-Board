describe("Admin spec", () => {
  beforeEach(() => {
    cy.visit("/signin");

    cy.get("input[name=name]").type("Tey");
    cy.get("input[name=password]").type("123456");

    cy.get("button").contains("Sign in").click();

    cy.wait(1000);
  });

  it("passes", () => {
    cy.visit("/jobs");

    cy.wait(1000);

    cy.get("h2").contains("Featured Jobs");
    cy.get(".chakra-link").contains("Jobs");
    cy.get(".chakra-link").contains("Users");

    cy.visit("/users");

    cy.wait(1000);

    cy.get("h2").contains("User List");

    cy.get("button").contains("Approve User").click();
  });
});
