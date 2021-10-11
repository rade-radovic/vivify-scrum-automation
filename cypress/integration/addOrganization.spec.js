/// <reference types ="Cypress" />

import login from '../fixtures/login-selectors.json'
import data from "../fixtures/data.json"
import addOrganizaton from "../fixtures/addOrganization-selectors.json"
import navigation from "../fixtures/navigation-selectors.json"

describe('Add new organization', () => {

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('valid login', () => {
        cy.get(login.emailInput).clear().type(data.user.email)
        cy.get(login.passwordInput).clear().type(data.user.password)
        cy.get(login.loginButton).click()
    })

    it('Empty organization name', () => {
        cy.get(addOrganizaton.addNewOrganization).click({force:true})
        cy.get(addOrganizaton.organizationNameInput).clear()
        //ovde bi stavio asertaciju da je next dugme disabled, ali posto to nismo radili ovaj it ce ostati ovako polovican zasad
    })

    it('Valid add new organization', () => {
        cy.get(addOrganizaton.addNewOrganization).click({force:true})
        cy.get(addOrganizaton.organizationNameInput).clear().type(data.organization.name)
        cy.get(addOrganizaton.nextOrCreateButton).click()
        cy.get(addOrganizaton.nextOrCreateButton).click()
    })

    it('edit organization', () => {
        cy.get(navigation.scrumLogo).click({force:true})
        cy.get(addOrganizaton.editButon).click({force:true})
        cy.get(addOrganizaton.changeOrganizationNameInput).clear().type(data.organization.changedName)
        cy.get(addOrganizaton.organizationNameChangeCheck).click({force:true})
    })

    it('cancel edit organization', () => {
        cy.get(navigation.scrumLogo).click({force:true})
        cy.get(addOrganizaton.editButon).click({force:true})
        cy.get(addOrganizaton.changeOrganizationNameInput).clear().type(data.organization.changedName)
        cy.get(addOrganizaton.cancelNameChangeButton).click({force:true})
    })

    it('cancel archive organization', () => {
        cy.get(navigation.scrumLogo).click({force:true})
        cy.get(addOrganizaton.archiveButton).click({force:true})
        cy.get(addOrganizaton.confirmArchiveNo).click()
    })

    it('Archive organization', () => {
        cy.get(navigation.scrumLogo).click({force:true})
        cy.get(addOrganizaton.archiveButton).click({force:true})
        cy.get(addOrganizaton.confirmArchiveYes).click()
    })




})