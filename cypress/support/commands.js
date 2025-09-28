// Custom commands for Pizza Order App

// Command to fill out a complete valid order form
Cypress.Commands.add('fillCompleteOrder', (userData = {}) => {
  const defaultData = {
    name: 'Cypress Test User',
    size: 'M',
    dough: 'ince',
    toppings: ['Pepperoni', 'Sosis', 'Tavuk Izgara', 'Soğan'],
    notes: 'Test order from Cypress',
    count: 1
  }
  
  const data = { ...defaultData, ...userData }
  
  cy.get('[data-cy="name-input"]').clear().type(data.name)
  cy.get(`[data-cy="size-${data.size}"]`).check({ force: true })
  cy.get('[data-cy="dough-select"]').select(data.dough)
  
  // Select toppings
  data.toppings.forEach(topping => {
    const toppingCy = topping.toLowerCase().replace(/\s+/g, '-')
    cy.get(`[data-cy="topping-${toppingCy}"]`).check({ force: true })
  })
  
  if (data.notes) {
    cy.get('textarea[name="notes"]').clear().type(data.notes)
  }
  
  // Set quantity
  if (data.count > 1) {
    for (let i = 1; i < data.count; i++) {
      cy.get('button').contains('+').click()
    }
  }
})

// Command to check if submit button is enabled/disabled
Cypress.Commands.add('checkSubmitButton', (shouldBeEnabled = true) => {
  const assertion = shouldBeEnabled ? 'not.be.disabled' : 'be.disabled'
  cy.get('[data-cy="order-submit-btn"]').should(assertion)
})

// Command to verify price calculation
Cypress.Commands.add('verifyPriceCalculation', (expectedPrice) => {
  cy.contains(`${expectedPrice.toFixed(2)}₺`).should('be.visible')
})

// Command to navigate to order page via homepage
Cypress.Commands.add('goToOrderPage', () => {
  cy.visit('/')
  cy.get('button').contains('ACIKTIM').click()
  cy.url().should('include', '/order')
})

// Command to submit order and verify success
Cypress.Commands.add('submitOrderAndVerifySuccess', () => {
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/success')
  cy.contains('lezzetin yolda').should('be.visible')
  cy.contains('SİPARİŞ ALINDI').should('be.visible')
})

// Command to check form validation errors
Cypress.Commands.add('checkValidationError', (errorMessage) => {
  cy.contains(errorMessage).should('be.visible')
  cy.get('.error-message').should('be.visible')
})

// Command to verify instagram photos in footer
Cypress.Commands.add('verifyInstagramPhotos', () => {
  cy.scrollTo('bottom')
  cy.contains('Instagram').should('be.visible')
  cy.get('.instagram-grid img').should('have.length', 6)
  cy.get('.instagram-grid img').each(($img, index) => {
    cy.wrap($img).should('be.visible')
    cy.wrap($img).should('have.attr', 'src').and('include', `li-${index}.png`)
  })
})

// Command to check responsive layout
Cypress.Commands.add('checkResponsiveLayout', (viewport) => {
  cy.viewport(viewport.width, viewport.height)
  
  if (viewport.width < 768) {
    // Mobile checks
    cy.get('.toppings-grid').should('be.visible')
    cy.get('input[name="name"]').should('be.visible')
  } else if (viewport.width < 1024) {
    // Tablet checks
    cy.get('.order-form').should('be.visible')
  } else {
    // Desktop checks
    cy.get('.order-container').should('be.visible')
  }
})

// Command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.wait(100) // Small delay to ensure all content is loaded
})