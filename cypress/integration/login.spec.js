/// <reference types ="Cypress" />

const loginPage = require('../fixtures/login-selectors.json')
import data from "../fixtures/data.json"
import validationMessages from '../fixtures/validationMessages.json'
import navigation from '../fixtures/navigation-selectors.json'

describe('Login', () => {

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('all empty fields', () => {
        cy.get(loginPage.loginButton).click()
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('empty email field', () => {
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginButton).click()
        cy.get(loginPage.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('empty password field', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear()
        cy.get(loginPage.loginButton).click()
        cy.get(loginPage.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('wrong password', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.negativeData.wrongPassword)
        cy.get(loginPage.loginButton).click()
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('wrong email', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.negativeData.wrongEmail)
        cy.get(loginPage.loginButton).click()
        cy.get(loginPage.backendErrorMessage).should('have.text', validationMessages.WrongEmailPassword)
    })

    it('valid login', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginButton).click()
        cy.get(navigation.scrumLogo).should('be.visible')
    })

    it('logout', () => {
        cy.get(loginPage.userButton, {timeout : 10000 }).click()
        cy.get(loginPage.profileButon).click()
        cy.get(loginPage.logoutButton).click()
        cy.get(loginPage.loginButton).should('be.visible')
    })
})



  