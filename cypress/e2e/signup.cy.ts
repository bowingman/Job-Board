describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/signup");

    cy.get("input[name=name]").type("Peter");
    cy.get("input[name=password]").type("123456789");
    cy.get("input[name=title]").type("I am a full stack developer");
    cy.get("textarea[name=description]").type("Seeking a wonderful team.");

    cy.get("button").contains("Sign up").click();

    cy.wait(500);

    cy.get("h2").contains("Sign in to your account");
  });

  it("not passes", () => {
    cy.visit("/signup");

    cy.get("input[name=name]").type("Peter");
    cy.get("input[name=password]").type("123456789");
    cy.get("input[name=title]").type("I am a full stack developer");
    cy.get("textarea[name=description]").type("Seeking a wonderful team.");

    cy.get("button").contains("Sign up").click();

    cy.get("h2").contains("Sign up");
  });
});
