/// <reference types ="Cypress" />

import register from '../fixtures/register-selectors.json'
import data from "../fixtures/data.json"
import validationMessages from '../fixtures/validationMessages.json'
import registerModule from '../models/registerModule'

describe('Register', () => {

    beforeEach('visit vivify scrum', () => {
        cy.visit("/sign-up?type=yearly&plan=3&event=page-card", {timeout: 30000});
        cy.url().should('include', '/sign-up?type=yearly&plan=3&event=page-card')
    })

    it('empty email', () => {
        registerModule.register({email : ""})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('empty password', () => {
        registerModule.register({password : ""})
        cy.get(register.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('unchecked terms', () => {
        registerModule.register({clickTermsCheckbox : true})
        cy.get(register.errorMessage).contains(validationMessages.termsRequired).should('have.text', validationMessages.termsRequired)
    })

    it('invalid number of users', () => {
        registerModule.register({numberOfUsers : data.negativeData.invalidNumberOfUsers})
        cy.get(register.errorMessage).contains(validationMessages.invalidNumberOfUsers).should('have.text', validationMessages.invalidNumberOfUsers)
    })

    it('Invalid email, no @', () => {
        registerModule.register({email : data.negativeData.invalidEmailNoMonkey})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('Invalid email, no dot', () => {
        registerModule.register({email : data.negativeData.invalidEmailNoDot})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('Invalid email, no username', () => {
        registerModule.register({email : data.negativeData.invalidEmailNoUsername})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('valid registration', () => {
        registerModule.register({})
        cy.get(register.signUpButton).should('not.exist')
    })
})