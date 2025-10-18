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
})
