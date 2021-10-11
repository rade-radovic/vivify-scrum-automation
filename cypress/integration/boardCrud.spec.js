/// <reference types ="Cypress" />

import login from '../fixtures/login-selectors.json'
import data from "../fixtures/data.json"
import board from "../fixtures/Board-selectors.json"

describe('Board CRUD', () => {

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000});
    })

    it('login', () => {
        cy.get(login.emailInput).clear().type(data.userBoardCrud.email)
        cy.get(login.passwordInput).clear().type(data.userBoardCrud.password)
        cy.get(login.loginButton).click()
    })

    it('add new board', () => {
        cy.get(board.myOrganizationFooter, {timeout:30000}).click()
        cy.get(board.modalOk).click()
        cy.get(board.addNewBoard).click()
        cy.get(board.boardNameInput).clear().type(data.board.name)
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.radioScrumType).click()
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.nextOrCreateButton).click()
    })

    it('Cancel archive board', () => {
        cy.get(board.myOrganizationFooter, {timeout:30000}).click()
        cy.get(board.modalOk).click()
        cy.get(board.archiveBoard).click({force:true})
        cy.get(board.confirmArchiveNo).click()
    })

    it('Archive board', () => {
        cy.get(board.myOrganizationFooter, {timeout:30000}).click()
        cy.get(board.modalOk).click()
        cy.get(board.archiveBoard).click({force:true})
        cy.get(board.confirmArchiveYes).click()
    })
})