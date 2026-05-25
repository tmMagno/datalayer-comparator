describe("Datalayer Comparator", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("debería cargar la página correctamente", () => {
    cy.contains("Datalayer Comparator").should("be.visible")
    cy.get("#esperado").should("be.visible")
    cy.get("#recibido").should("be.visible")
    cy.get("#btn-comparar").should("be.visible")
  })

})