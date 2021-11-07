import board from '../models/boardModule'

Cypress.Commands.add('addBoard', (boardName) => {
    board.addNewBoard.should('be.visible').click()
    board.boardNameInput.type(boardName)
    board.nextOrCreateButton.click()
    board.radioScrumType.click()
    board.nextOrCreateButton.click()
    board.nextOrCreateButton.click()
    board.nextOrCreateButton.click()
})

Cypress.Commands.add('createColumn', (columnName) => {
    board.boardHeader.eq(0).click()
    board.addColumn.click()
    board.columnNameInput.type(columnName + "{enter}")
})

Cypress.Commands.add('addTasktoTheTopOfTheColumn', (taskName) => {
    board.boardHeader.eq(0).click()
    board.columnAddTaskToTop.click({force:true})
    board.taskNameInput.type(taskName + "{enter}")
})
   
Cypress.Commands.add('addTaskToTheBottomOfTheColumn', (taskName) => {
    board.boardHeader.eq(0).click()
    board.columnAddTaskToBottom.eq(0).click({force:true})
    board.taskNameInput.type(taskName + "{enter}")
})

Cypress.Commands.add('cancelArchiveBoard', () => {
    board.archiveBoardButton.click({force:true})
    board.confirmArchiveNo.click()
})
   
Cypress.Commands.add('archiveBoard', () => {
    board.archiveBoardButton.click({force:true})
    board.confirmArchiveYes.click()
})

