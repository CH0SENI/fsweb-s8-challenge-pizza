// Manual test - Check if basic elements exist
describe('Manual DOM Check', () => {
  it('should visit homepage and check basic elements', () => {
    cy.visit('/')
    
    // Log what we find
    cy.get('body').then(() => {
      console.log('Homepage loaded successfully')
    })
    
    // Check basic text content
    cy.contains('ACIKTIM').should('exist')
    cy.contains('KOD ACIKTIRIR').should('exist')
    
    // Check if order button exists with data-cy
    cy.get('[data-cy="order-btn"]').should('exist')
  })

  it('should visit order page and check form elements', () => {
    cy.visit('/order')
    
    // Check if page loads
    cy.contains('Position Absolute Acı Pizza').should('exist')
    
    // Check form elements
    cy.get('[data-cy="name-input"]').should('exist')
    cy.get('[data-cy="dough-select"]').should('exist')
    cy.get('[data-cy="order-submit-btn"]').should('exist')
  })
})