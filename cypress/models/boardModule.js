import data from "../fixtures/data.json"

module.exports = {
    get addNewBoard() {
        return cy.get("div[class='vs-c-organization-boards__item--add-new']")
    },
    get closeButton() {
        return cy.get("button[name='close-new-board-modal-btn'] > .el-icon-close")
    },
    get selectOrganizationDropdown() {
        return cy.get("input[class='el-input__inner']")
    },
    get boardNameInput() {
        return cy.get("input[name='name']")
    },
    get cancelOrPreviousButton() {
        return cy.get("button[name='prev_btn']")
    },
    get nextOrCreateButton() {
        return cy.get("button[name='next_btn']")
    },
    get radioScrumType() {
        return cy.get("span[name='type_scrum']")
    },
    get radioKanbanType() {
        return cy.get("span[name='type_kanban']")
    },
    get uploadLogo() {
        return cy.get("div[class='el-upload-dragger']")
    },
    get trialModalClose() {
        return cy.get(".vs-c-modal__body > .el-button > .el-icon-close")
    },
    get myOrganizationFooter() {
        return cy.get(".vs-c-my-organization__footer")
    },
    get modalOk() {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button']")
    },
    get boardTitle() {
        return cy.get("h1[title='My first board'] > span")
    },
    get boardHeader() {
        return cy.get("div[class='vs-c-boards-item__header']")
    },
    get addColumn() {
        return cy.get(".not-sortable.vs-add-column-btn-gap.vs-c-col.vs-is-empty > .vs-add-new-task.vs-c-btn.vs-c-btn--round.vs-c-btn--sm.vs-c-btn--themify-primary", {timeout:30000})
    },
    get archiveBoardButton() {
        return cy.get(".vs-c-organization__body .vs-c-organization__section:nth-of-type(1) .vs-c-boards-item__actions div")
    },
    get confirmArchiveNo() {
        return cy.get(".el-button--warning")
    },
    get confirmArchiveYes() {
        return cy.get(".el-button--success")
    },
    get boardsSection() {
        return cy.get("div[class='vs-c-organization__section']")
    },
    get columnName() {
        return cy.get("h2[class='vs-c-col__title']")
    },
    get columnNameInput() {
        return cy.get("input[name='column-name']")
    },
    get columnAddTaskToTop() {
        return cy.get("button[class='vs-add-new-task vs-c-btn vs-c-btn--themify-secondary vs-c-btn--round vs-c-btn--sm']")
    },
    get columnAddTaskToBottom() {
        return cy.get("button[class='vs-add-new-task vs-c-btn vs-c-btn--themify-secondary vs-c-btn--round vs-c-btn--sm vs-c-task-card__not-selectable']")
    },
    get taskNameInput() {
        return cy.get("textarea[name='item_name']")
    },
    get taskName() {
        return cy.get("div[class='vue-simple-markdown markdown-body vs-c-reach-textarea-preview']")
    },
    get myFirstBoard() {
        return cy.get(".vs-c-organization__body .vs-c-organization__section:nth-of-type(1) .vs-c-boards-item__header", {timeout:30000})
    },
   
    addBoard(boardName){
        this.addNewBoard.should('be.visible').click()
        this.boardNameInput.type(boardName)
        this.nextOrCreateButton.click()
        this.radioScrumType.click()
        this.nextOrCreateButton.click()
        this.nextOrCreateButton.click()
        this.nextOrCreateButton.click()
    },

    createColumn(columnName){
        this.boardHeader.eq(0).click()
        this.addColumn.click()
        this.columnNameInput.type(columnName + "{enter}")
    },
   
    addTasktoTheTopOfTheColumn(taskName){
        this.boardHeader.eq(0).click()
        this.columnAddTaskToTop.click({force:true})
        this.taskNameInput.type(taskName + "{enter}")
    },

    addTaskToTheBottomOfTheColumn(taskName){
        this.boardHeader.eq(0).click()
        this.columnAddTaskToBottom.eq(0).click({force:true})
        this.taskNameInput.type(taskName + "{enter}")
    },
   
    cancelArchiveBoard(){
        this.archiveBoardButton.click({force:true})
        this.confirmArchiveNo.click()
    },

    archiveBoard(){
        this.archiveBoardButton.click({force:true})
        this.confirmArchiveYes.click()
    }
}