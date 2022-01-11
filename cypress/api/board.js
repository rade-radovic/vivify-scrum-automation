import faker from 'faker'
import color from '../support/console_color'

module.exports = {

    post({
        token = "",
        organizationId = null,
        boardTitle = faker.animal.snake(),
        boardType = "scrum_board",
        statusCode = 201,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'POST',
            url : 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards',
            headers : {
                Authorization : `Bearer ${token}`
            },
            body : {
                name: boardTitle,
                type :boardType,
                configuration_board_id : null,
                team_members_board_id : null,
                organization_id : organizationId
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    },

    edit({
        token = "",
        boardId = null,
        boardTitle = faker.animal.snake(),
        statusCode = 200,
        testMessage = "",
        boardCode = ""
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'PUT',
            url : `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            headers : {
                Authorization : `Bearer ${token}`
            },
            body : {
                name : boardTitle,
                description:null,
                code: boardCode,
                task_unit: "points"
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    },

    archive({
        token = "",
        boardId = null,
        statusCode = 200,
        testMessage = "",
    }) {
        return cy.request({
            failOnStatusCode : false,
            method : 'PUT',
            url : `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}/status`,
            headers : {
                Authorization : `Bearer ${token}`
            },
            body : {
                status: "archived"
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    },

    get({
        token = "",
        organizationId = "",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
          method: "GET",
          url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}/boards-data`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eql(200)
            return response.body
        })
    },
}