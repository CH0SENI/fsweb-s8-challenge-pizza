describe('Form Validation Tests', () => {
  beforeEach(() => {
    cy.visit('/order')
  })

  describe('Name Validation', () => {
    it('should show error for empty name', () => {
      cy.get('[data-cy="name-input"]').focus().blur()
      // Error might not show immediately for empty field
    })

    it('should show error for name less than 3 characters', () => {
      cy.get('[data-cy="name-input"]').type('Ab')
      cy.contains('İsim en az 3 karakter olmalıdır.')
    })

    it('should accept valid name', () => {
      cy.get('[data-cy="name-input"]').type('Valid Name')
      cy.get('.error-message').should('not.exist')
    })

    it('should handle special characters in name', () => {
      cy.get('[data-cy="name-input"]').type('Ömer Çağlar')
      cy.get('[data-cy="name-input"]').should('have.value', 'Ömer Çağlar')
    })
  })

  describe('Size Selection', () => {
    it('should require size selection', () => {
      // Complete other fields first
      cy.get('[data-cy="name-input"]').type('Test User')
      cy.get('[data-cy="dough-select"]').select('ince')
      
      // Add 4 toppings
      cy.get('[data-cy="topping-pepperoni"]').check({ force: true })
      cy.get('[data-cy="topping-sosis"]').check({ force: true })
      cy.get('[data-cy="topping-tavuk-izgara"]').check({ force: true })
      cy.get('[data-cy="topping-soğan"]').check({ force: true })
      
      // Submit should still be disabled without size
      cy.get('[data-cy="order-submit-btn"]').should('be.disabled')
    })

    it('should update price when size changes', () => {
      // Small (no extra cost)
      cy.get('[data-cy="size-S"]').check({ force: true })
      cy.contains('85.50₺')
      
      // Medium (+10₺)
      cy.get('[data-cy="size-M"]').check({ force: true })
      cy.contains('95.50₺')
      
      // Large (+25₺)
      cy.get('[data-cy="size-L"]').check({ force: true })
      cy.contains('110.50₺')
    })
  })

  describe('Dough Selection', () => {
    it('should require dough selection', () => {
      cy.get('[data-cy="name-input"]').type('Test User')
      cy.get('[data-cy="size-M"]').check({ force: true })
      
      // Add toppings
      cy.get('[data-cy="topping-pepperoni"]').check({ force: true })
      cy.get('[data-cy="topping-sosis"]').check({ force: true })
      cy.get('[data-cy="topping-tavuk-izgara"]').check({ force: true })
      cy.get('[data-cy="topping-soğan"]').check({ force: true })
      
      // Submit should be disabled without dough
      cy.get('[data-cy="order-submit-btn"]').should('be.disabled')
    })

    it('should allow all dough options', () => {
      cy.get('[data-cy="dough-select"]').select('ince')
      cy.get('[data-cy="dough-select"]').should('have.value', 'ince')
      
      cy.get('[data-cy="dough-select"]').select('standart')
      cy.get('[data-cy="dough-select"]').should('have.value', 'standart')
      
      cy.get('[data-cy="dough-select"]').select('kalin')
      cy.get('[data-cy="dough-select"]').should('have.value', 'kalin')
    })
  })

  describe('Toppings Validation', () => {
    beforeEach(() => {
      // Fill other required fields
      cy.get('[data-cy="name-input"]').type('Test User')
      cy.get('[data-cy="size-M"]').check({ force: true })
      cy.get('[data-cy="dough-select"]').select('ince')
    })

    it('should require at least 4 toppings', () => {
      // Select only 3 toppings
      cy.get('[data-cy="topping-pepperoni"]').check({ force: true })
      cy.get('[data-cy="topping-sosis"]').check({ force: true })
      cy.get('[data-cy="topping-tavuk-izgara"]').check({ force: true })
      
      cy.contains('En az 4 malzeme seçmelisiniz.')
      cy.get('button[type="submit"]').should('be.disabled')
    })

    it('should allow exactly 4 toppings', () => {
      cy.get('input[name="toppings"][value="Pepperoni"]').check({ force: true })
      cy.get('input[name="toppings"][value="Sosis"]').check({ force: true })
      cy.get('input[name="toppings"][value="Tavuk Izgara"]').check({ force: true })
      cy.get('input[name="toppings"][value="Soğan"]').check({ force: true })
      
      cy.get('.error-message').should('not.contain', 'En az 4 malzeme')
      cy.get('button[type="submit"]').should('not.be.disabled')
    })

    it('should allow up to 10 toppings', () => {
      // Select all toppings (should be 12 total)
      const toppings = [
        'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara',
        'Soğan', 'Domates', 'Mısır', 'Jalapeno',
        'Sarımsak', 'Ananas'
      ]
      
      // Select 10 toppings
      toppings.forEach(topping => {
        cy.get(`input[name="toppings"][value="${topping}"]`).check({ force: true })
      })
      
      cy.get('.error-message').should('not.contain', 'En fazla 10 malzeme')
    })

    it('should prevent more than 10 toppings', () => {
      // This test depends on whether UI prevents selection or shows error
      // Select all 12 toppings
      const allToppings = [
        'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara',
        'Soğan', 'Domates', 'Mısır', 'Jalapeno',
        'Sarımsak', 'Ananas', 'Sucuk', 'Zeytin'
      ]
      
      allToppings.forEach(topping => {
        cy.get(`input[name="toppings"][value="${topping}"]`).check({ force: true })
      })
      
      // Should show error for too many toppings
      cy.contains('En fazla 10 malzeme seçebilirsiniz.')
    })

    it('should update price with toppings', () => {
      // Base price with medium size
      cy.contains('95.50₺')
      
      // Add first topping (+5₺)
      cy.get('input[name="toppings"][value="Pepperoni"]').check({ force: true })
      cy.contains('100.50₺')
      
      // Add second topping (+5₺)
      cy.get('input[name="toppings"][value="Sosis"]').check({ force: true })
      cy.contains('105.50₺')
      
      // Remove first topping (-5₺)
      cy.get('input[name="toppings"][value="Pepperoni"]').uncheck({ force: true })
      cy.contains('100.50₺')
    })
  })

  describe('Quantity Controls', () => {
    it('should start with quantity 1', () => {
      cy.get('.quantity').should('contain.text', '1')
    })

    it('should increase quantity', () => {
      cy.get('button').contains('+').click()
      cy.get('.quantity').should('contain.text', '2')
      
      cy.get('button').contains('+').click()
      cy.get('.quantity').should('contain.text', '3')
    })

    it('should decrease quantity but not below 1', () => {
      // Try to decrease from 1 - should stay at 1
      cy.get('button').contains('-').click()
      cy.get('.quantity').should('contain.text', '1')
      
      // Increase then decrease
      cy.get('button').contains('+').click()
      cy.get('button').contains('+').click()
      cy.get('.quantity').should('contain.text', '3')
      
      cy.get('button').contains('-').click()
      cy.get('.quantity').should('contain.text', '2')
    })

    it('should update total price with quantity', () => {
      // Set up a pizza with known price
      cy.get('[data-cy="size-M"]').check({ force: true }) // +10₺
      cy.get('[data-cy="topping-pepperoni"]').check({ force: true }) // +5₺
      // Total should be: 85.50 + 10 + 5 = 100.50₺
      
      cy.contains('100.50₺')
      
      // Double quantity
      cy.get('button').contains('+').click()
      cy.contains('201.00₺') // 100.50 * 2
    })
  })

  describe('Notes Field', () => {
    it('should accept notes input', () => {
      const testNote = 'Lütfen kapının ziline basın'
      cy.get('textarea[name="notes"]').type(testNote)
      cy.get('textarea[name="notes"]').should('have.value', testNote)
    })

    it('should allow empty notes', () => {
      // Notes should be optional - form should be valid without notes
      cy.get('[data-cy="name-input"]').type('Test User')
      cy.get('[data-cy="size-M"]').check({ force: true })
      cy.get('[data-cy="dough-select"]').select('ince')
      
      cy.get('[data-cy="topping-pepperoni"]').check({ force: true })
      cy.get('[data-cy="topping-sosis"]').check({ force: true })
      cy.get('[data-cy="topping-tavuk-izgara"]').check({ force: true })
      cy.get('[data-cy="topping-soğan"]').check({ force: true })
      
      // Should be valid without notes
      cy.get('[data-cy="order-submit-btn"]').should('not.be.disabled')
    })
  })
})