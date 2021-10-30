/// <reference types ="Cypress" />

import login from '../fixtures/login-selectors.json'
import data from "../fixtures/data.json"
import addOrganizaton from "../fixtures/addOrganization-selectors.json"
import navigation from "../fixtures/navigation-selectors.json"
import loginModule from '../models/loginModule'
describe('Add new organization', () => {

    beforeEach('visit vivify scrum adn login', () => {
        cy.visit("/", { timeout: 30000});
        loginModule.login({ email : data.userOrganizationCrud.email, password : data.userOrganizationCrud.password})
    //     cy.get(login.emailInput).clear().type(data.userOrganizationCrud.email)
    //     cy.get(login.passwordInput).clear().type(data.userOrganizationCrud.password)
    //     cy.get(login.loginButton).click()
    })

    it('Empty organization name', () => {
        cy.get(addOrganizaton.addNewOrganization).click({force:true})
        cy.get(addOrganizaton.organizationNameInput).clear()
        cy.get(addOrganizaton.nextOrCreateButton)
        .should('have.class', 'el-button vs-c-button-focus el-button--success el-button--large is-disabled')
    })

    it('Valid add new organization', () => {
        cy.get(addOrganizaton.addNewOrganization).click({force:true})
        cy.get(addOrganizaton.organizationNameInput).clear().type(data.organization.name)
        cy.get(addOrganizaton.nextOrCreateButton).click()
        cy.get(addOrganizaton.nextOrCreateButton).click()
        cy.get(addOrganizaton.modalOk).click()
        cy.get(navigation.scrumLogo).click()
        cy.get(addOrganizaton.organizationTitle).contains(data.organization.name)
            .should('have.text', data.organization.name)
    })

    it('edit organization', () => {
        cy.get(navigation.scrumLogo).click()
        cy.get(addOrganizaton.editButon).eq(0).click()
        cy.get(addOrganizaton.changeOrganizationNameInput).clear().type(data.organization.changedName)
        cy.get(addOrganizaton.organizationNameChangeCheck).click()
        cy.get(addOrganizaton.organizationTitle).eq(0).should('have.text', data.organization.changedName)
    })

    it('cancel edit organization', () => {
        cy.get(addOrganizaton.editButon).eq(0).click()
        cy.get(addOrganizaton.changeOrganizationNameInput).clear().type(data.organization.canceledChangeName)
        cy.get(addOrganizaton.cancelNameChangeButton).click()
        cy.get(addOrganizaton.organizationTitle).eq(0).should('not.have.text', data.organization.canceledChangeName)
    })

    it('cancel archive organization', () => {
        cy.get(addOrganizaton.archiveButton).eq(0).click({force:true})
        cy.get(addOrganizaton.confirmArchiveNo).click()
        cy.get(addOrganizaton.organizationTitle).eq(0).should('have.text', data.organization.changedName)
    })

    it('Archive organization', () => {
        cy.get(navigation.scrumLogo).click()
        cy.get(addOrganizaton.archiveButton).click()
        cy.get(addOrganizaton.confirmArchiveYes).click()
        cy.get(addOrganizaton.myOrganmizationsDiv).children().children().should('have.length', 2)
    })
})