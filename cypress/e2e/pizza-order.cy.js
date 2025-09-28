describe('Pizza Order Application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage correctly', () => {
    // Check if the homepage loads
    cy.contains('KOD ACIKTIRIR')
    cy.contains('PİZZA, DOYURUR')
    cy.contains('fırsatı kaçırma')
    
    // Check if the main button exists
    cy.get('button').contains('ACIKTIM').should('be.visible')
    
    // Check if logo is visible
    cy.get('img[alt="logo"]').should('be.visible')
  })

  it('should navigate to order page', () => {
    // Click the order button
    cy.get('[data-cy="order-btn"]').click()
    
    // Should be on order page
    cy.url().should('include', '/order')
    cy.contains('Position Absolute Acı Pizza')
  })

  it('should display pizza information on order page', () => {
    cy.visit('/order')
    
    // Check pizza details
    cy.contains('Position Absolute Acı Pizza')
    cy.contains('85.50₺')
    cy.contains('4.9')
    cy.contains('(200)')
    
    // Check if pizza image is visible
    cy.get('.pizza-image-section img').should('be.visible')
  })

  it('should require form validation', () => {
    cy.visit('/order')
    
    // Initially submit button should be disabled
    cy.get('button[type="submit"]').should('be.disabled')
    
    // Fill only name - should still be disabled
    cy.get('input[name="name"]').type('Test User')
    cy.get('button[type="submit"]').should('be.disabled')
    
    // Select size - should still be disabled
    cy.get('input[name="size"][value="M"]').check()
    cy.get('button[type="submit"]').should('be.disabled')
    
    // Select dough - should still be disabled (needs toppings)
    cy.get('select[name="dough"]').select('ince')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('should enable submit button when form is valid', () => {
    cy.visit('/order')
    
    // Fill out the complete form
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="size"][value="M"]').check()
    cy.get('select[name="dough"]').select('ince')
    
    // Select at least 4 toppings
    cy.get('input[name="toppings"][value="Pepperoni"]').check()
    cy.get('input[name="toppings"][value="Sosis"]').check()
    cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
    cy.get('input[name="toppings"][value="Soğan"]').check()
    
    // Now submit button should be enabled
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('should show validation errors', () => {
    cy.visit('/order')
    
    // Type short name
    cy.get('input[name="name"]').type('Te')
    cy.contains('İsim en az 3 karakter olmalıdır.')
    
    // Select less than 4 toppings
    cy.get('input[name="toppings"][value="Pepperoni"]').check()
    cy.get('input[name="toppings"][value="Sosis"]').check()
    cy.contains('En az 4 malzeme seçmelisiniz.')
  })

  it('should update price when selections change', () => {
    cy.visit('/order')
    
    // Initial price should be base price
    cy.contains('85.50₺')
    
    // Select medium size (adds 10₺)
    cy.get('input[name="size"][value="M"]').check()
    cy.contains('95.50₺')
    
    // Add toppings (5₺ each)
    cy.get('input[name="toppings"][value="Pepperoni"]').check()
    cy.contains('100.50₺')
    
    cy.get('input[name="toppings"][value="Sosis"]').check()
    cy.contains('105.50₺')
  })

  it('should allow quantity changes', () => {
    cy.visit('/order')
    
    // Check initial quantity
    cy.get('input[name="count"]').should('have.value', '1')
    
    // Increase quantity
    cy.get('button').contains('+').click()
    cy.get('input[name="count"]').should('have.value', '2')
    
    // Check price doubled (approximately)
    // Will depend on selections, but should be more than single
    
    // Decrease quantity
    cy.get('button').contains('-').click()
    cy.get('input[name="count"]').should('have.value', '1')
  })

  it('should complete order process', () => {
    cy.visit('/order')
    
    // Fill complete form
    cy.get('input[name="name"]').type('Cypress Test User')
    cy.get('input[name="size"][value="L"]').check()
    cy.get('select[name="dough"]').select('kalın')
    
    // Select 4 toppings
    cy.get('input[name="toppings"][value="Pepperoni"]').check()
    cy.get('input[name="toppings"][value="Sosis"]').check()
    cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
    cy.get('input[name="toppings"][value="Soğan"]').check()
    
    // Add notes
    cy.get('textarea[name="notes"]').type('Test sipariş notu')
    
    // Submit order
    cy.get('button[type="submit"]').click()
    
    // Should navigate to success page
    cy.url().should('include', '/success')
    cy.contains('lezzetin yolda')
    cy.contains('SİPARİŞ ALINDI')
  })

  it('should display order details on success page', () => {
    // First complete an order
    cy.visit('/order')
    
    cy.get('input[name="name"]').type('Success Test User')
    cy.get('input[name="size"][value="M"]').check()
    cy.get('select[name="dough"]').select('standart')
    
    cy.get('input[name="toppings"][value="Pepperoni"]').check()
    cy.get('input[name="toppings"][value="Sosis"]').check()
    cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
    cy.get('input[name="toppings"][value="Soğan"]').check()
    
    cy.get('button[type="submit"]').click()
    
    // Verify success page content
    cy.contains('Position Absolute Acı Pizza')
    cy.contains('Orta') // Size
    cy.contains('Standart') // Dough
    cy.contains('Pepperoni') // Toppings
    cy.contains('Sipariş Toplamı')
  })

  it('should show instagram photos in footer', () => {
    cy.visit('/order')
    
    // Scroll to footer
    cy.scrollTo('bottom')
    
    // Check instagram section
    cy.contains('Instagram')
    cy.get('.instagram-grid .insta-photo img').should('have.length', 6)
    
    // Check if images load
    cy.get('.instagram-grid .insta-photo img').each(($img) => {
      cy.wrap($img).should('be.visible')
      cy.wrap($img).should('have.attr', 'src').and('include', 'li-')
    })
  })

  it('should be responsive on mobile viewport', () => {
    cy.viewport(375, 667) // iPhone SE size
    
    cy.visit('/')
    cy.get('button').contains('ACIKTIM').should('be.visible')
    
    cy.visit('/order')
    cy.get('input[name="name"]').should('be.visible')
    cy.get('.toppings-grid').should('be.visible')
    
    // Mobile form should work
    cy.get('input[name="name"]').type('Mobile Test')
    cy.get('input[name="size"][value="S"]').check({ force: true })
    cy.get('select[name="dough"]').select('ince')
  })
})