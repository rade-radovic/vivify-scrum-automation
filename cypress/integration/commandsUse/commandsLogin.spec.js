/// <reference types ="Cypress" />

const loginPage = require('../../fixtures/login-selectors.json')
import data from "../../fixtures/data.json"
import validationMessages from '../../fixtures/validationMessages.json'
import navigation from '../../fixtures/navigation-selectors.json'

describe('Login', () => {

    beforeEach('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('all empty fields', () => {
        cy.login({email : "", password : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('empty email field', () => {
        cy.login({email : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('empty password field', () => {
        cy.login({password : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('wrong password', () => {
        cy.login({password : data.negativeData.wrongPassword})
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('wrong email', () => {
        cy.login({email : data.negativeData.wrongEmail})
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('valid login', () => {
        cy.login({})
        cy.get(navigation.scrumLogo).should('be.visible')
    })

    it.only('logout', () => {
        cy.login({})
        cy.logout()
        cy.get(loginPage.loginButton).should('be.visible')
    })
})



  