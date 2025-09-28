describe('Navigation Tests', () => {
  describe('Homepage Navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should display homepage elements', () => {
      cy.get('img[alt="logo"]').should('be.visible')
      cy.contains('fırsatı kaçırma').should('be.visible')
      cy.contains('KOD ACIKTIRIR').should('be.visible')
      cy.contains('PİZZA, DOYURUR').should('be.visible')
      cy.get('button').contains('ACIKTIM').should('be.visible')
    })

    it('should navigate to order page when button clicked', () => {
      cy.get('button').contains('ACIKTIM').click()
      cy.url().should('include', '/order')
    })

    it('should display food categories', () => {
      // Check if category icons are visible
      cy.contains('YENİ! Kore').should('be.visible')
      cy.contains('Pizza').should('be.visible')
      cy.contains('Burger').should('be.visible')
      cy.contains('Kızartmalar').should('be.visible')
      cy.contains('Fast food').should('be.visible')
      cy.contains('Gazlı İçecek').should('be.visible')
    })

    it('should display promotion cards', () => {
      cy.contains('Özel Lezzetus').should('be.visible')
      cy.contains('Hackathlon Burger Menü').should('be.visible')
      
      // Check if promotion images are loaded
      cy.get('img[alt*="promotion"]').should('exist')
    })

    it('should display food gallery', () => {
      cy.contains('en çok paketlenen menüler').should('be.visible')
      cy.contains('Acıktıran Kodlara Doyuran Lezzetler').should('be.visible')
      
      // Check food images
      cy.get('.food-item').should('have.length.at.least', 3)
    })

    it('should display footer information', () => {
      cy.scrollTo('bottom')
      cy.contains('Teknolojik Yemekler').should('be.visible')
      cy.contains('Adres').should('be.visible')
      cy.contains('Instagram').should('be.visible')
    })
  })

  describe('Order Page Navigation', () => {
    beforeEach(() => {
      cy.visit('/order')
    })

    it('should display breadcrumb navigation', () => {
      cy.contains('Anasayfa').should('be.visible')
      cy.contains('Sipariş Oluştur').should('be.visible')
    })

    it('should navigate back to homepage via breadcrumb', () => {
      cy.contains('Anasayfa').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should display pizza information', () => {
      cy.contains('Position Absolute Acı Pizza').should('be.visible')
      cy.contains('85.50₺').should('be.visible')
      cy.contains('4.9').should('be.visible')
      cy.contains('(200)').should('be.visible')
    })

    it('should display form sections', () => {
      cy.contains('Boyut Seç').should('be.visible')
      cy.contains('Hamur Seç').should('be.visible')
      cy.contains('Ek Malzemeler').should('be.visible')
      cy.contains('İsim').should('be.visible')
      cy.contains('Sipariş Notu').should('be.visible')
    })

    it('should display order summary', () => {
      cy.contains('Sipariş Toplamı').should('be.visible')
      cy.contains('Seçimler').should('be.visible')
      cy.contains('Toplam').should('be.visible')
      cy.get('button[type="submit"]').should('contain', 'SİPARİŞ VER')
    })

    it('should display footer with instagram photos', () => {
      cy.scrollTo('bottom')
      cy.contains('Instagram').should('be.visible')
      cy.get('.instagram-grid img').should('have.length', 6)
    })
  })

  describe('Success Page Navigation', () => {
    beforeEach(() => {
      // Complete an order first
      cy.visit('/order')
      
      cy.get('input[name="name"]').type('Navigation Test User')
      cy.get('input[name="size"][value="M"]').check()
      cy.get('select[name="dough"]').select('ince')
      
      cy.get('input[name="toppings"][value="Pepperoni"]').check()
      cy.get('input[name="toppings"][value="Sosis"]').check()
      cy.get('input[name="toppings"][value="Tavuk Izgara"]').check()
      cy.get('input[name="toppings"][value="Soğan"]').check()
      
      cy.get('button[type="submit"]').click()
    })

    it('should display success page elements', () => {
      cy.url().should('include', '/success')
      cy.contains('lezzetin yolda').should('be.visible')
      cy.contains('SİPARİŞ ALINDI').should('be.visible')
    })

    it('should display order details', () => {
      cy.contains('Position Absolute Acı Pizza').should('be.visible')
      cy.contains('Boyut:').should('be.visible')
      cy.contains('Hamur:').should('be.visible')
      cy.contains('Ek Malzemeler:').should('be.visible')
      cy.contains('Sipariş Toplamı').should('be.visible')
    })

    it('should display correct order information', () => {
      cy.contains('Orta') // Size
      cy.contains('İnce') // Dough
      cy.contains('Pepperoni') // Topping
      cy.contains('Sosis') // Topping
    })
  })

  describe('URL Direct Access', () => {
    it('should handle direct access to order page', () => {
      cy.visit('/order')
      cy.contains('Position Absolute Acı Pizza').should('be.visible')
      cy.get('input[name="name"]').should('be.visible')
    })

    it('should handle direct access to success page without order data', () => {
      cy.visit('/success')
      // Should show loading or empty state
      cy.contains('Sipariş Detayları Yükleniyor').should('be.visible')
    })

    it('should handle invalid routes', () => {
      cy.visit('/invalid-route', { failOnStatusCode: false })
      // This will depend on your router setup
      // Might redirect to home or show 404
    })
  })

  describe('Browser Navigation', () => {
    it('should handle back button navigation', () => {
      cy.visit('/')
      cy.get('button').contains('ACIKTIM').click()
      cy.url().should('include', '/order')
      
      cy.go('back')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.contains('ACIKTIM').should('be.visible')
    })

    it('should handle forward button navigation', () => {
      cy.visit('/')
      cy.get('button').contains('ACIKTIM').click()
      cy.go('back')
      cy.go('forward')
      cy.url().should('include', '/order')
    })

    it('should maintain form state during navigation', () => {
      cy.visit('/order')
      
      // Fill some form data
      cy.get('input[name="name"]').type('Test User')
      cy.get('input[name="size"][value="M"]').check()
      
      // Navigate away and back
      cy.visit('/')
      cy.visit('/order')
      
      // Form should be reset (depending on implementation)
      cy.get('input[name="name"]').should('have.value', '')
    })
  })

  describe('Responsive Navigation', () => {
    it('should work on mobile viewport', () => {
      cy.viewport(375, 667)
      
      cy.visit('/')
      cy.get('button').contains('ACIKTIM').should('be.visible').click()
      cy.url().should('include', '/order')
      
      // Form should be accessible on mobile
      cy.get('input[name="name"]').should('be.visible')
      cy.get('.toppings-grid').should('be.visible')
    })

    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024)
      
      cy.visit('/')
      cy.get('button').contains('ACIKTIM').should('be.visible').click()
      
      cy.get('input[name="name"]').type('Tablet User')
      cy.get('input[name="size"][value="L"]').check()
      cy.get('select[name="dough"]').select('kalın')
      
      // Should work normally on tablet
      cy.get('button[type="submit"]').should('exist')
    })
  })
})