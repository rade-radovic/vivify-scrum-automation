/// <reference types ="Cypress" />

import register from '../../fixtures/register-selectors.json'
import data from "../../fixtures/data.json"
import validationMessages from '../../fixtures/validationMessages.json'


describe('Register', () => {

    beforeEach('visit vivify scrum', () => {
        cy.visit("/sign-up?type=yearly&plan=3&event=page-card", {timeout: 30000});
        cy.url().should('include', '/sign-up?type=yearly&plan=3&event=page-card')
    })

    it('empty email', () => {
        cy.register({email : ""})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('empty password', () => {
        cy.register({password : ""})
        cy.get(register.errorMessage).contains(validationMessages.passwordRequired).should('have.text', validationMessages.passwordRequired)
    })

    it('unchecked terms', () => {
        cy.register({clickTermsCheckbox : true})
        cy.get(register.errorMessage).contains(validationMessages.termsRequired).should('have.text', validationMessages.termsRequired)
    })

    it('invalid number of users', () => {
        cy.register({numberOfUsers : data.negativeData.invalidNumberOfUsers})
        cy.get(register.errorMessage).contains(validationMessages.invalidNumberOfUsers).should('have.text', validationMessages.invalidNumberOfUsers)
    })

    it('Invalid email, no @', () => {
        cy.register({email : data.negativeData.invalidEmailNoMonkey})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('Invalid email, no dot', () => {
        cy.register({email : data.negativeData.invalidEmailNoDot})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('Invalid email, no username', () => {
        cy.register({email : data.negativeData.invalidEmailNoUsername})
        cy.get(register.errorMessage).contains(validationMessages.invalidEmail).should('have.text', validationMessages.invalidEmail)
    })

    it('valid registration', () => {
        cy.register({})
        cy.get(register.signUpButton).should('not.exist')
    })
})