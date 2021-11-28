
import faker from 'faker'
import color from '../support/console_color'

module.exports = {
    get({token = ""}) {
        return cy.request({
          method: "GET",
          url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
            expect(response.status).to.eql(200)
            return response.body
        })
    },

    post({
        orgName = faker.animal.insect(),
        token = "",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode : false,
            method: "POST",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body : {
                name : orgName
            },
            headers : {
                Authorization : `Bearer ${token}`
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

    delete({
        orgId = "",
        token = "",
        statusCode = 201,
        testMessage = "",
        password = "test1234"
    }) {
        cy.request({
            failOnStatusCode : false,
            method: "POST",
            url : `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body : {
                passwordOrEmail : password
            },
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            
        })
    },

    edit({
        orgName = faker.animal.insect(),
        token = "",
        statusCode = 200,
        testMessage = "",
        orgId = ""
    }) {
        return cy.request({
            failOnStatusCode : false,
            method: "PUT",
            url : `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body : {
                name : orgName
            },
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    }
}