/// <reference types ="Cypress" />

const loginPage = require('../fixtures/login-selectors.json')
import data from "../fixtures/data.json"

describe('first cypress block', () => {

    // it('firts test positive', () => {
    //     expect(true).to.eq(true);
    // })

    // it('firts test negatives', () => {
    //     expect(true).to.eq(false);
    // })

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('all empty fields', () => {
        cy.get(loginPage.loginButton).click()
    })

    it('empty email field', () => {
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginButton).click()
    })

    it('empty password field', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear()
        cy.get(loginPage.loginButton).click()
    })

    it('wrong password', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.negativeData.wrongPassword)
        cy.get(loginPage.loginButton).click()
    })

    it('wrong email', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.negativeData.wrongEmail)
        cy.get(loginPage.loginButton).click()
    })

    it('valid login', () => {
        cy.get(loginPage.emailInput).clear().type(data.user.email)
        cy.get(loginPage.passwordInput).clear().type(data.user.password)
        cy.get(loginPage.loginButton).click()
    })

    it('logout', () => {
        cy.get(loginPage.userButton, {timeout : 10000 }).click()
        cy.get(loginPage.profileButon).click()
        cy.get(loginPage.logoutButton).click()
    })


})



  