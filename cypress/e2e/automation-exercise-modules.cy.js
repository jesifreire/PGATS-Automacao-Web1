/// <reference types="cypress" />

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
    it('Cadastrar um usuário', () => {

      cy.contains('button', 'Signup').click()

        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDePreCadastro()
        
        //Assert
        cy.url().should('includes', 'account_created')
       
        cy.contains('b', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click()

    });

    it('Login de usuário com e-mail e senha corretos', () => {
      

        cy.get('a[href="/login"]').click()
     
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.get('i.fa-user').parent().should('contain', userData.name)
        
        cy.get(':nth-child(9) > a')
        
    });
    it('Login de usuário com e-mail e senha incorretos', () => {
      
        cy.get('a[href="/login"]').click()
       
        login.preencherFormularioDeLogin(userData.user, '120456')
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')  
    });
    it('Logout de usuário com e-mail e senha corretos', () => {
        cy.get('a[href="/login"]').click()
      
        login.preencherFormularioDeLogin(userData.user, userData.password)
        cy.get(':nth-child(9) > a') 
      
       menu.efetuarLogout()
        cy.get('.login-form > h2').should('contain', 'Login to your account')
        
    })
    it('Cadastrar usuário com e-mail e senha existente', () => {
       
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Qa Eevee')
        cy.get('[data-qa="signup-email"]').type('eevee-1759530412987@teste.com')
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!') 
         
})
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





})
