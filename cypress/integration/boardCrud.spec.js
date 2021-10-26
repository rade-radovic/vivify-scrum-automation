/// <reference types ="Cypress" />

import login from '../fixtures/login-selectors.json'
import data from "../fixtures/data.json"
import board from "../fixtures/board-selectors.json"

describe('Board CRUD', () => {

    beforeEach('visit vivify scrum, login and go to organziation', () => {
        cy.visit("/", { timeout: 30000});
        cy.get(login.emailInput).clear().type(data.userBoardCrud.email)
        cy.get(login.passwordInput).clear().type(data.userBoardCrud.password)
        cy.get(login.loginButton).click()
        cy.get(board.myOrganizationFooter, {timeout:30000}).click()
        cy.get(board.modalOk).click()
    })

    it('add new board', () => {
        cy.get(board.addNewBoard).click()
        cy.get(board.boardNameInput).clear().type(data.board.name)
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.radioScrumType).click()
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.nextOrCreateButton).click()
        cy.get(board.boardTitle).should('have.text', data.board.name)
    })

    it('Create column', () => {
        cy.get(board.boardHeader).eq(0).click()
        cy.get(board.addColumn).click()
        cy.get(board.column.nameInput).type(data.column.name + "{enter}")
        cy.get(board.column.name).contains(data.column.name).should('have.text', data.column.name)
    })

    it('Add a task to the top of the column', () => {
        cy.get(board.boardHeader).eq(0).click()
        cy.get(board.column.addTaskToTop).click({force:true})
        cy.get(board.task.nameInput).type(data.task.name + "{enter}")
        cy.get(board.task.name).contains(data.task.name).should('have.text', data.task.name)

    })

    it('Add a task to the bottom of the column', () => {
        cy.get(board.boardHeader).eq(0).click()
        cy.get(board.column.addTaskToBottom).eq(1).click({force:true})
        cy.get(board.task.nameInput).type(data.task.name2 + "{enter}")
        cy.get(board.task.name).contains(data.task.name2).should('have.text', data.task.name2)
    })

    it('Cancel archive board', () => {
        cy.get(board.archiveBoard).click({force:true})
        cy.get(board.confirmArchiveNo).click()
        cy.get(board.boardsSection).eq(0).children().should('have.length', 2)

    })

    it('Archive board', () => {
        cy.get(board.archiveBoard).click({force:true})
        cy.get(board.confirmArchiveYes).click()
        cy.get(board.boardsSection).eq(0).children().should('have.length', 1)
    })
})