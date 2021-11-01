/// <reference types ="Cypress" />

import data from "../fixtures/data.json"
import board from "../fixtures/board-selectors.json"
import loginModule from '../models/loginModule'
import boardModule from '../models/boardModule'

describe('Board CRUD', () => {

    beforeEach('visit vivify scrum, login and go to organziation', () => {
        cy.visit("/", { timeout: 90000});
        loginModule.login({ email : data.userBoardCrud.email, password : data.userBoardCrud.password})
        cy.get(board.myOrganizationFooter, {timeout:30000}).click()
        cy.get(board.modalOk).click()
    })

    it('add new board', () => {
        boardModule.addBoard(data.board.name)
        cy.get(board.boardTitle).should('have.text', data.board.name)
    })

    it('Create column', () => {
        boardModule.createColumn(data.column.name)
        cy.get(board.column.name).contains(data.column.name).should('have.text', data.column.name)
    })

    it('Add a task to the top of the column', () => {
        boardModule.addTasktoTheTopOfTheColumn(data.task.name)
        cy.get(board.task.name).contains(data.task.name).should('have.text', data.task.name)

    })

    it('Add a task to the bottom of the column', () => {
        boardModule.addTaskToTheBottomOfTheColumn(data.task.name2)
        cy.get(board.task.name).contains(data.task.name2).should('have.text', data.task.name2)
    })

    it('Cancel archive board', () => {
        boardModule.cancelArchiveBoard()
        cy.get(board.boardsSection).eq(0).children().should('have.length', 2)
    })

    it('Archive board', () => {
        boardModule.archiveBoard()
        cy.get(board.boardsSection).eq(0).children().should('have.length', 1)
    })
})