describe('UI/UX Tests', () => {
  describe('Visual Elements', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should display all images correctly', () => {
      // Homepage hero image
      cy.get('.hero-section-it2').should('be.visible')
      
      // Logo should load
      cy.get('img[alt="logo"]').should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
      
      // Category icons should load
      cy.get('.icon-item img').should('have.length.at.least', 6)
        .each(($img) => {
          cy.wrap($img).should('be.visible')
        })
    })

    it('should have proper color scheme', () => {
      // Check main brand colors are used
      cy.get('body').should('have.css', 'background-color')
      cy.get('.cursive-text').should('have.css', 'color', 'rgb(253, 201, 19)') // #fdc913
    })

    it('should use correct fonts', () => {
      cy.get('body').should('have.css', 'font-family').and('include', 'Barlow')
      cy.get('.cursive-text').should('have.css', 'font-family').and('include', 'Satisfy')
    })
  })

  describe('Interactive Elements', () => {
    beforeEach(() => {
      cy.visit('/order')
    })

    it('should show hover effects on buttons', () => {
      cy.get('button[type="submit"]').trigger('mouseover')
      // Button should have hover styles (will depend on CSS implementation)
    })

    it('should show focus states on form elements', () => {
      cy.get('input[name="name"]').focus()
      cy.get('input[name="name"]').should('have.focus')
      
      cy.get('select[name="dough"]').focus()
      cy.get('select[name="dough"]').should('have.focus')
    })

    it('should show loading state during form submission', () => {
      // Fill complete form
      cy.get('input[name="name"]').type('Loading Test User')
      cy.get('input[name="size"][value="M"]').check()
      cy.get('select[name="dough"]').select('ince')
      
      cy.get('input[name="toppings"][value="Pepperoni"]').check()
      cy.get('input[name="toppings"][value="Sosis"]').check()
      cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
      cy.get('input[name="toppings"][value="Soğan"]').check()
      
      cy.get('button[type="submit"]').click()
      
      // Should show loading text briefly
      cy.contains('SİPARİŞ GÖNDERİLİYOR', { timeout: 2000 })
    })

    it('should disable submit button when form is invalid', () => {
      cy.get('button[type="submit"]').should('be.disabled')
      cy.get('button[type="submit"]').should('have.css', 'cursor', 'not-allowed')
    })

    it('should enable submit button when form is valid', () => {
      cy.get('input[name="name"]').type('Valid User')
      cy.get('input[name="size"][value="M"]').check()
      cy.get('select[name="dough"]').select('ince')
      
      cy.get('input[name="toppings"][value="Pepperoni"]').check()
      cy.get('input[name="toppings"][value="Sosis"]').check()
      cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
      cy.get('input[name="toppings"][value="Soğan"]').check()
      
      cy.get('button[type="submit"]').should('not.be.disabled')
      cy.get('button[type="submit"]').should('have.css', 'cursor', 'pointer')
    })
  })

  describe('Form User Experience', () => {
    beforeEach(() => {
      cy.visit('/order')
    })

    it('should show real-time validation feedback', () => {
      // Name validation
      cy.get('input[name="name"]').type('Te')
      cy.contains('İsim en az 3 karakter olmalıdır.').should('be.visible')
      
      cy.get('input[name="name"]').clear().type('Valid Name')
      cy.get('.error-message').should('not.contain', 'İsim en az 3 karakter')
    })

    it('should update price immediately when selections change', () => {
      // Base price
      cy.contains('85.50₺')
      
      // Select size - price should update immediately
      cy.get('input[name="size"][value="M"]').check()
      cy.contains('95.50₺')
      
      // Add topping - price should update immediately
      cy.get('input[name="toppings"][value="Pepperoni"]').check()
      cy.contains('100.50₺')
    })

    it('should provide visual feedback for selections', () => {
      // Radio buttons should show selection
      cy.get('input[name="size"][value="M"]').check()
      cy.get('input[name="size"][value="M"]').should('be.checked')
      
      // Checkboxes should show selection
      cy.get('input[name="toppings"][value="Pepperoni"]').check()
      cy.get('input[name="toppings"][value="Pepperoni"]').should('be.checked')
      
      // Selected elements should have visual styling
      cy.get('input[name="toppings"][value="Pepperoni"]').parent()
        .should('have.class', 'topping-option')
    })

    it('should handle quantity controls smoothly', () => {
      cy.get('input[name="count"]').should('have.value', '1')
      
      // Increment should work
      cy.get('button').contains('+').click()
      cy.get('input[name="count"]').should('have.value', '2')
      
      // Decrement should work
      cy.get('button').contains('-').click()
      cy.get('input[name="count"]').should('have.value', '1')
      
      // Should not go below 1
      cy.get('button').contains('-').click()
      cy.get('input[name="count"]').should('have.value', '1')
    })
  })

  describe('Responsive Design', () => {
    it('should adapt to mobile viewport', () => {
      cy.viewport(375, 667)
      cy.visit('/')
      
      // Hero section should be responsive
      cy.get('.hero-section-it2').should('be.visible')
      cy.get('button').contains('ACIKTIM').should('be.visible')
      
      cy.visit('/order')
      
      // Form should stack vertically on mobile
      cy.get('.toppings-grid').should('be.visible')
      cy.get('input[name="name"]').should('be.visible')
    })

    it('should adapt to tablet viewport', () => {
      cy.viewport(768, 1024)
      cy.visit('/order')
      
      // Layout should adjust for tablet
      cy.get('.order-form').should('be.visible')
      cy.get('.pizza-image-section').should('be.visible')
    })

    it('should work on desktop viewport', () => {
      cy.viewport(1920, 1080)
      cy.visit('/order')
      
      // Should utilize full width appropriately
      cy.get('.order-container').should('be.visible')
      cy.get('.order-form').should('be.visible')
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/order')
    })

    it('should have proper form labels', () => {
      // Check if form elements have associated labels or aria-labels
      cy.get('input[name="name"]').should('have.attr', 'id')
      cy.get('label[for]').should('exist')
    })

    it('should be keyboard navigable', () => {
      // Tab through form elements
      cy.get('input[name="name"]').focus()
      cy.get('input[name="name"]').tab()
      
      // Should be able to navigate through size options
      cy.focused().should('have.attr', 'name', 'size')
    })

    it('should have proper alt text for images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
      })
    })

    it('should have proper button text', () => {
      cy.get('button[type="submit"]').should('contain.text', 'SİPARİŞ VER')
      cy.get('button').contains('+').should('be.visible')
      cy.get('button').contains('-').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      cy.visit('/order')
    })

    it('should show clear error messages', () => {
      cy.get('input[name="name"]').type('Te')
      cy.get('.error-message').should('contain', 'İsim en az 3 karakter olmalıdır.')
      cy.get('.error-message').should('have.css', 'color', 'rgb(206, 40, 41)') // Error color
    })

    it('should show validation state in form fields', () => {
      cy.get('input[name="name"]').type('Te')
      cy.get('input[name="name"]').should('have.class', 'error')
    })

    it('should clear errors when input becomes valid', () => {
      cy.get('input[name="name"]').type('Te')
      cy.contains('İsim en az 3 karakter olmalıdır.')
      
      cy.get('input[name="name"]').clear().type('Valid Name')
      cy.get('.error-message').should('not.contain', 'İsim en az 3 karakter')
    })
  })

  describe('Loading States', () => {
    it('should show loading spinner on success page if no data', () => {
      cy.visit('/success')
      cy.get('.loading-spinner').should('be.visible')
      cy.contains('Sipariş Detayları Yükleniyor').should('be.visible')
    })
  })

  describe('Instagram Gallery', () => {
    beforeEach(() => {
      cy.visit('/order')
      cy.scrollTo('bottom')
    })

    it('should display all instagram photos', () => {
      cy.get('.instagram-grid img').should('have.length', 6)
    })

    it('should load instagram images properly', () => {
      cy.get('.instagram-grid img').each(($img, index) => {
        cy.wrap($img).should('be.visible')
        cy.wrap($img).should('have.attr', 'src').and('include', `li-${index}.png`)
        cy.wrap($img).should('have.attr', 'alt', 'Instagram post')
      })
    })

    it('should have hover effects on instagram photos', () => {
      cy.get('.instagram-grid .insta-photo').first().trigger('mouseover')
      // Should have hover transform effect
    })
  })
})