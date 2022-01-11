import userApi from '../api/user'
import boardApi from '../api/board'
import organizationApi from '../api/organization'

describe('Board Api testing', () => {
    let userToken;
    before(() => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })
    let organizationId;
    before('first', () => {
        organizationApi.post({
            token : userToken,
            testMessage : "01 - create organization"
        }).then((organizationObject) => {
            organizationId = organizationObject.id
        })
    })
    let boardId;
    let boardCode;
    it('create board', () => {
        boardApi.post({token : userToken, organizationId : organizationId, testMessage : "01 - create board"}).then((responseBody) => {
            boardCode = responseBody.code
            boardId = responseBody.id
        })
    })

    it('edit board', () => {
        boardApi.edit({token : userToken, boardId : boardId, boardCode : boardCode, testMessage : "02 - edit board"})
    })

    it.skip('delete single board', () => {
        boardApi.archive({token : userToken, boardId : boardId, testMessage : "03 - archive single board"})
    })
    let allBoards;
    after('get all boards', () => {
        boardApi.get({token : userToken, organizationId : organizationId, testMessage : "04 - get all boards"}).then((responseBody) => {
            allBoards = responseBody;
        })
    })

    after('archive all boards', () => {
        allBoards.forEach(board => {
            if(board.status === "active") {
                boardApi.archive({token : userToken, boardId : board.id, testMessage : "archiveing all boards"})
            }
        })
    })

    let allOrganizations;
    after('get all organizations', () => {
        organizationApi.get({token : userToken}).then((allOrgs) => {
            allOrganizations = allOrgs
        })
    })

    after('delete all organizations', () => {
        allOrganizations.forEach(org => {
            organizationApi.delete({token : userToken, orgId : org.id})
        })
    })
})