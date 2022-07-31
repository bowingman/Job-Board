describe("Clients spec", () => {
  beforeEach(() => {
    cy.visit("/signin");

    cy.get("input[name=name]").type("James");
    cy.get("input[name=password]").type("123456");

    cy.get("button").contains("Sign in").click();

    cy.wait(1000);
  });

  it("passes", () => {
    cy.visit("/jobs");

    cy.wait(1000);

    cy.get("h2").contains("Featured Jobs");
    cy.get(".chakra-link").contains("Jobs");

    cy.get("button").contains("+ New Job").click();

    cy.wait(500);

    cy.get("input[name=title]").type("Test1");
    cy.get("textarea[name=description]").type("Test1");
    cy.get("textarea[name=company_tips]").type("Test1 ,Test2");
    cy.get("textarea[name=job_info]").type("Test1");
    cy.get("select[name=company_scale]").select("giant");

    cy.get("button").contains("POST JOB").click();
  });
});
