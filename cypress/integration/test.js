describe("test this ish", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })
    it("add text to input to name", () => {
        cy.get('input[name="name"]')
        .type("fredo")
        .should("have.value", "fredo");

        cy.get('select')
        .select("medium");

        cy.get('[type="checkbox"]').check()
        .should('be.checked');

        cy.get("textarea")
        .type("I want a sandwhich not pizza")
        .should("have.value", "I want a sandwhich not pizza");

        cy.get('button')
        .click();
    })
})