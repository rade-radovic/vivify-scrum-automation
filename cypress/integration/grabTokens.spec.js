
import userApi from '../api/user'
import data from '../fixtures/data.json'


describe('Grab tokens', () => {
    let userToken = {};
    it('user login', () => {
        for (const [key, value] of Object.entries(data.accounts)) {
            userApi.login({email : value.email, password : value.password, testMessage : "01 - get tokens"}).then((token) => {
            userToken[key] = token;
            }) 
        }
    })

    it('log', () => {
        cy.writeFile('cypress/fixtures/k6token.json', [userToken]) 
    })
})