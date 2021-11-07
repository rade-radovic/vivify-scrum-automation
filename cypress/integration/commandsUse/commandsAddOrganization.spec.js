/// <reference types ="Cypress" />

import data from "../../fixtures/data.json"
import addOrganizaton from "../../fixtures/addOrganization-selectors.json"
describe('Add new organization', () => {

    beforeEach('visit vivify scrum adn login', () => {
        cy.visit("/", { timeout: 30000});
        cy.login({ email : data.userOrganizationCrud.email, password : data.userOrganizationCrud.password})
    })

    it('Empty organization name', () => {
        cy.addOrganization({organizationName : ""} )
        cy.get(addOrganizaton.nextOrCreateButton)
        .should('have.class', 'el-button vs-c-button-focus el-button--success el-button--large is-disabled')
    })

    it('Valid add new organization', () => {
        cy.addOrganization({})
        cy.get(addOrganizaton.organizationTitle).contains(data.organization.name)
            .should('have.text', data.organization.name)
    })

    it('edit organization', () => {
        cy.editOrganization({})
        cy.get(addOrganizaton.organizationTitle).eq(0).should('have.text', data.organization.changedName)
    })

    it('cancel edit organization', () => {
        cy.editOrganization({changedName : data.organization.canceledChangeName, cancelChange : true})
        cy.get(addOrganizaton.organizationTitle).eq(0).should('not.have.text', data.organization.canceledChangeName)
    })

    it('cancel archive organization', () => {
        cy.archiveOrganization({archive : false})
        cy.get(addOrganizaton.organizationTitle).eq(0).should('have.text', data.organization.changedName)
    })

    it('Archive organization', () => {
      cy.archiveOrganization({})
        cy.get(addOrganizaton.myOrganmizationsDiv).children().children().should('have.length', 2)
    })
})