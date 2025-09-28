describe('Pizza App Basic Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage correctly', () => {
    cy.contains('KOD ACIKTIRIR')
    cy.contains('PİZZA, DOYURUR')
    cy.contains('fırsatı kaçırma')
    cy.get('[data-cy="order-btn"]').should('be.visible')
    cy.get('img[alt="logo"]').should('be.visible')
  })
  
  it('should navigate to order page', () => {
    cy.get('[data-cy="order-btn"]').click()
    cy.url().should('include', '/order')
    cy.contains('Position Absolute Acı Pizza')
  })

  it('should display order form elements', () => {
    cy.visit('/order')
    cy.get('[data-cy="name-input"]').should('be.visible')
    cy.get('[data-cy="dough-select"]').should('be.visible')
    cy.get('[data-cy="size-S"]').should('exist')
    cy.get('[data-cy="size-M"]').should('exist')
    cy.get('[data-cy="size-L"]').should('exist')
    cy.get('[data-cy="order-submit-btn"]').should('be.visible')
  })

  it('should require form fields to be filled', () => {
    cy.visit('/order')
    // Submit button should be disabled initially
    cy.get('[data-cy="order-submit-btn"]').should('be.disabled')
  })
})