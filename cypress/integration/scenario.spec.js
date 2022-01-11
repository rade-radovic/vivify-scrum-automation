
import userApi from '../api/user'
import color from '../support/console_color'
import organizationApi from '../api/organization'

describe('api testing', () => {
    let userToken;
    before(() => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })
    let organizationId;
    it('first', () => {
        organizationApi.post({
            token : userToken,
            testMessage : "01 - create organization"
        }).then((organizationObject) => {
            organizationId = organizationObject
        })
    })

    it('edit org', () => {
        organizationApi.edit({token : userToken, orgId : organizationId.id})
    })

    it('edit org, emty string for name', () => {
        organizationApi.edit({token : userToken, orgId : organizationId.id, orgName : ""})
    })
    

    it.skip('delete org', () => {
        organizationApi.delete({token : userToken, orgId : organizationId.id})
    })

    let allOrganizations;
    it('get all organizations', () => {
        organizationApi.get({token : userToken}).then((allOrgs) => {
            allOrganizations = allOrgs
        })
    })

    it('delete all organizations', () => {
        allOrganizations.forEach(org => {
            organizationApi.delete({token : userToken, orgId : org.id})
        })
    })
    

})