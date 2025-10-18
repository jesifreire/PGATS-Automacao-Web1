///<reference types="cypress" />

import userData from '../fixtures/example.json'
import { getRandomNumber,
  getRandomEmail

} from '../support/helpers'

import { faker } from '@faker-js/faker'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/') 

        menu.navegarParaLogin()
    })
    // Cenário 1
    it('Cadastrar um usuário', () => {

      cy.contains('button', 'Signup').click()

        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDePreCadastro()
        
        //Assert
        cy.url().should('includes', 'account_created')
       
        cy.contains('b', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click()

    });
    // Cenário 2
    it('Login de usuário com e-mail e senha corretos', () => {
      

        cy.get('a[href="/login"]').click()
     
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.get('i.fa-user').parent().should('contain', userData.name)
        
        cy.get(':nth-child(9) > a')
        
    });
    // Cenário 3
    it('Login de usuário com e-mail e senha incorretos', () => {
      
        cy.get('a[href="/login"]').click()
       
        login.preencherFormularioDeLogin(userData.user, '120456')
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')  
    });
    // Cenário 4
    it('Logout de usuário com e-mail e senha corretos', () => {
        cy.get('a[href="/login"]').click()
      
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.get(':nth-child(9) > a') 
      
       menu.efetuarLogout()
        cy.get('.login-form > h2').should('contain', 'Login to your account')
        
    })
    // Cenário 5
    it('Cadastrar usuário com e-mail e senha existente', () => {
       
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Qa Eevee')
        cy.get('[data-qa="signup-email"]').type('eevee-1759530412987@teste.com')
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!') 
         
})  // Cenário 6
    it('Enviar um formulario de contato', () => {
          
        cy.get(':nth-child(8) > a').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type('eevee-1759530412987@teste.com')
        cy.get('[data-qa="subject"]').type(userData.Subject)
        cy.get('[data-qa="message"]').type(userData.Message)

        cy.fixture('example.json').as('file')
        cy.get('input[type=file]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.') 
      

    })
    // Cenário 8 
    it('Deve listar todos os produtos e validar a página de detalhes', () => {
      // Acesse a página de produtos
      cy.visit('https://automationexercise.com/products')
  
      cy.get('.title.text-center').should('contain', 'All Products')
  
      cy.get('.single-products', { timeout: 10000 }).should('have.length.greaterThan', 0)
      cy.get('.single-products').first().trigger('mouseover')
      cy.get('.choose > .nav > li > a').first().click()
  
      cy.get('.product-information').should('be.visible')
      cy.get('.product-information h2').should('not.be.empty')
  })
  
  // Cenário 9 
  it('Deve pesquisar um produto e validar o resultado', () => {
      
      cy.visit('https://automationexercise.com/products')

      cy.get('.title.text-center', { timeout: 10000 }).should('contain', 'All Products')
     
      cy.get('#search_product', { timeout: 10000 }).type('Dress')
      cy.get('#submit_search').click()

      cy.get('.title.text-center').should('contain', 'Searched Products')
      cy.get('.single-products', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })
  
  // Cenário 10 
  it('Deve validar a inscrição de e-mail na home', () => {
    cy.get('#susbscribe_email').type('teste' + Date.now() + '@email.com')
    cy.get('#subscribe').click()
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!')
  })
  
  
  // Cenário 15 – 
 it.only('Deve cadastrar e realizar pedido durante o checkout', () => {
      cy.visit('https://automationexercise.com')
  
    
      cy.contains('Signup / Login').click()
  
      cy.contains('New User Signup!', { timeout: 10000 }).should('be.visible')
  
      cy.get('input[data-qa="signup-name"], input[name="name"], #name', { timeout: 10000 })
      .first()
      .type('Teste ' + Date.now())
  
      cy.get('input[data-qa="signup-email"], input[name="email"], #email', { timeout: 10000 })
      .first()
      .type('teste' + Date.now() + '@email.com')
      cy.get('button[data-qa="signup-button"], [data-qa="signup-button"], button:contains("Signup")', { timeout: 10000 })
      .first()
      .click()
  
      // Aguarde até que o formulário de cadastro esteja visível
      cy.get('form', { timeout: 15000 }).should('be.visible')

      // Verifique se o texto "Enter Account Information" está presente no DOM
      cy.contains('Enter Account Information', { timeout: 15000 })
        .should('exist')
        .then(($el) => {
          cy.log('Texto encontrado:', $el.text());
        });
  
      cy.contains('Enter Account Information', { timeout: 15000 }).should('be.visible')
  

    cy.get('#id_gender1').click()
    cy.get('#password').type('123456')
    cy.get('#days').select('10')
    cy.get('#months').select('May')
    cy.get('#years').select('1995')
    cy.get('#first_name').type('Teste')
    cy.get('#last_name').type('QA')
    cy.get('#address1').type('Rua QA, 123')
    cy.get('#country').select('Canada')
    cy.get('#state').type('Ontario')
    cy.get('#city').type('Toronto')
    cy.get('#zipcode').type('A1B2C3')
    cy.get('#mobile_number').type('999999999')
  
    cy.get('[data-qa="create-account"], button:contains("Create Account")', { timeout: 10000 }).click()
    cy.contains('Account Created!', { timeout: 10000 }).should('be.visible')
    cy.get('[data-qa="continue-button"], a:contains("Continue")', { timeout: 10000 }).click()
  
    
    cy.contains('Products').click()
    cy.get('.product-overlay').first().trigger('mouseover')
    cy.get('.add-to-cart').first().click()
    cy.contains('View Cart').click()
    cy.contains('Proceed To Checkout').click()
  
    
    cy.get('a:contains("Register / Login"), a:contains("Continue as Guest")', { timeout: 5000 }).then($links => {
      if ($links.length) {
       
        cy.wrap($links[0]).click()
      }
    })
  
    cy.get('[data-qa="name-on-card"], input[name="name_on_card"], #name_on_card', { timeout: 10000 }).type('Teste QA')
    cy.get('[data-qa="card-number"], input[name="card_number"], #card_number').type('1234123412341234')
    cy.get('[data-qa="cvc"], input[name="cvc"], #cvc').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()
  
    cy.get('#success_message, .alert-success, .checkout-success', { timeout: 10000 })
      .should('be.visible')
      .and($el => {
        const text = $el.text().toLowerCase()
        expect(text).to.include('your order has been placed successfully').or.to.include('order placed!')
      })
  })
  
  
  // Cenário 16 
  it.skip('Deve logar e realizar pedido', () => {
   
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.get('[data-qa="login-email"]').type('user_teste@qa.com')
    cy.get('[data-qa="login-password"]').type('123456')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    cy.get(':nth-child(3) > a').click()
    //cy.get('.add-to-cart').first().click()
    cy.get('u').click()
    //cy.get('.check_out').click()
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
   // cy.get('.modal-body > :nth-child(2) > a').click()
    // Verifique se o elemento '[data-qa="name-on-card"]' existe no DOM antes de verificar sua visibilidade
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="name-on-card"]').length) {
        cy.get('[data-qa="name-on-card"]', { timeout: 10000 }).should('be.visible').type('QA Eevee');
      } else {
        cy.log('Elemento [data-qa="name-on-card"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });
    // Verifique se o elemento '[data-qa="card-number"]' existe no DOM antes de interagir com ele
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="card-number"]').length) {
        cy.get('[data-qa="card-number"]', { timeout: 10000 }).should('be.visible').type('1234123412341234');
      } else {
        cy.log('Elemento [data-qa="card-number"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });
    // Verifique se o elemento '[data-qa="cvc"]' existe no DOM antes de interagir com ele
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="cvc"]').length) {
        cy.get('[data-qa="cvc"]', { timeout: 10000 }).should('be.visible').type('123');
      } else {
        cy.log('Elemento [data-qa="cvc"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });
    // Verifique se o elemento '[data-qa="expiry-month"]' existe no DOM antes de interagir com ele
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="expiry-month"]').length) {
        cy.get('[data-qa="expiry-month"]', { timeout: 10000 }).should('be.visible').type('12');
      } else {
        cy.log('Elemento [data-qa="expiry-month"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });

    // Verifique se o elemento '[data-qa="expiry-year"]' existe no DOM antes de interagir com ele
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="expiry-year"]').length) {
        cy.get('[data-qa="expiry-year"]', { timeout: 10000 }).should('be.visible').type('2030');
      } else {
        cy.log('Elemento [data-qa="expiry-year"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });

    // Verifique se o elemento '[data-qa="pay-button"]' existe no DOM antes de interagir com ele
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="pay-button"]').length) {
        cy.get('[data-qa="pay-button"]', { timeout: 10000 }).should('be.visible').click();
      } else {
        cy.log('Elemento [data-qa="pay-button"] não encontrado no DOM. Verifique o fluxo do teste.');
      }
    });

    cy.get('#success_message').should('contain', 'Your order has been placed successfully!')
  })


})
