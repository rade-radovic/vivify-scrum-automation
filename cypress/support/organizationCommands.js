import organization from '../models/organizationModule'
import data from '../fixtures/data.json'
import navigation from '../models/navigationModule'

Cypress.Commands.add('addOrganization', ({
    organizationName = data.organization.name
}) => {
    organization.addNewOrganization.click({force : true})
    if(organizationName !== ""){
        organization.organizationNameInput.type(organizationName)
        organization.nextOrCreateButton.click()
        organization.nextOrCreateButton.click()
        organization.modalOk.click()
        navigation.scrumLogo.click()
    }
})

Cypress.Commands.add('editOrganization', ({
    changedName = data.organization.changedName,
    cancelChange = false
}) => {
    organization.editButon.eq(0).click()
    organization.changeOrganizationNameInput.clear().type(changedName)
    if(cancelChange){
        organization.cancelNameChangeButton.click()
    }else{
        organization.organizationNameChangeCheck.click()
    }
})

Cypress.Commands.add('archiveOrganization', ({
    archive = true
}) => {
    organization.archiveButton.click({force:true})
    if(archive){
        organization.confirmArchiveYes.click()
    }else{
        organization.confirmArchiveNo.click()
    }
})


