/// <reference types ="Cypress" />

const loginPage = require('../fixtures/login-selectors.json')
import data from "../fixtures/data.json"
import validationMessages from '../fixtures/validationMessages.json'
import navigation from '../fixtures/navigation-selectors.json'
import loginModule from '../models/loginModule'

describe('Login', () => {

    beforeEach('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('all empty fields', () => {
        loginModule.login({email : "", password : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('empty email field', () => {
        loginModule.login({email : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('empty password field', () => {
        loginModule.login({password : ""})
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('wrong password', () => {
        loginModule.login({password : data.negativeData.wrongPassword})
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('wrong email', () => {
        loginModule.login({email : data.negativeData.wrongEmail})
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('valid login', () => {
        loginModule.login({})
        cy.get(navigation.scrumLogo).should('be.visible')
    })

    it.only('logout', () => {
        loginModule.login({})
        loginModule.logout()
        cy.get(loginPage.loginButton).should('be.visible')
    })
})



  