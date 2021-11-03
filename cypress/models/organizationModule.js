import data from "../fixtures/data.json"
import navigation from '../models/navigationModule'

module.exports = {
    get addNewOrganization() {
        return cy.get("div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']")
    },
    get closeButton() {
        return cy.get("button[name='close-new-board-modal-btn'] > .el-icon-close")
    },
    get organizationNameInput() {
        return cy.get("input[name='name']")
    },
    get cancelOrPreviousButton() {
        return cy.get("button[name='prev_btn']")
    },
    get nextOrCreateButton() {
        return cy.get("button[name='next_btn']")
    },
    get editButon() {
        return cy.get("span[title='Edit Organization']")
    },
    get archiveButton() {
        return cy.get("span[title='Archive Organization']")
    },
    get changeOrganizationNameInput() {
        return cy.get("input[name='change-organization-name']")
    },
    get organizationNameChangeCheck() {
        return cy.get("button[name='change-organization-name'] > .el-icon-check")
    },
    get cancelNameChangeButton() {
        return cy.get("button:nth-of-type(2) > .el-icon-close")
    },
    get confirmArchiveYes() {
        return cy.get("button[name='save-btn']")
    },
    get confirmArchiveNo() {
        return cy.get("button[name='cancel-btn']")
    },
    get modalOk() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn")
    },
    get organizationTitle() {
        return cy.get("h2[class='vs-c-my-organization__title']")
    },
    get myOrganmizationsDiv() {
        return cy.get("div[class='vs-c-my-organizations-item-wrapper']")
    },
    get uploadLogo() {
        return cy.get("div[class='el-upload-dragger']")
    },
    
    addOrganization({
        organizationName = data.organization.name
    }){
        this.addNewOrganization.click({force : true})
        if(organizationName !== ""){
            this.organizationNameInput.type(organizationName)
            this.nextOrCreateButton.click()
            this.nextOrCreateButton.click()
            this.modalOk.click()
            navigation.scrumLogo.click()
        }
    },
  
    editOrganization({
        changedName = data.organization.changedName,
        cancelChange = false
    }){
        this.editButon.eq(0).click()
        this.changeOrganizationNameInput.clear().type(changedName)
        if(cancelChange){
            this.cancelNameChangeButton.click()
        }else{
            this.organizationNameChangeCheck.click()
        }
    },
 
    archiveOrganization({
        archive = true
    }){
        this.archiveButton.click({force:true})
        if(archive){
            this.confirmArchiveYes.click()
        }else{
            this.confirmArchiveNo.click()
        }
    }
}