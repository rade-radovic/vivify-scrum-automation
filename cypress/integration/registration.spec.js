/// <reference types ="Cypress" />

import register from '../fixtures/register-selectors.json'
import login from '../fixtures/login-selectors.json'
import data from "../fixtures/data.json"

describe('Register', () => {

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('empty email', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear()
        cy.get(register.passwordInput).clear().type('test1234')
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('empty password', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type(data.registerData.unregisteredEmail)
        cy.get(register.passwordInput).clear()
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('unchecked terms', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type(data.registerData.unregisteredEmail)
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.termsCheckbox).click()
        cy.get(register.signUpButton).click()
    })

    it('invalid number of users', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type('test@test.com')
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.negativeData.invalidNumberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('Invalid email, no @', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type(data.negativeData.invalidEmailNoMonkey)
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('Invalid email, no dot', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type(data.negativeData.invalidEmailNoDot)
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('Invalid email, no username', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type(data.negativeData.invalidEmailNoUsername)
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

    it('valid registration', () => {
        cy.get(login.signUpLink).click()
        cy.get(register.growtSignUp).click({force : true})
        cy.get(register.emailInput).clear().type('test@test.com')
        cy.get(register.passwordInput).clear().type(data.user.password)
        cy.get(register.numberOfUsers).clear().type(data.registerData.numberOfUsers)
        cy.get(register.signUpButton).click()
    })

})