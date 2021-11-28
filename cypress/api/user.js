import color from '../support/console_color'

module.exports = {
    login({email = "board@crud.com", password = "test1234", statusCode = 200, testMessage = ""}) {
        return cy.request({
            method : "POST",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            body : {
                email: email,
                password: password
            },
            failOnStatusCode : false
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage} - Pass`, "success")
            : color.log(`${testMessage} - fail - ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
            console.log(response.body.token)
            return response.body.token
        })
    }
}