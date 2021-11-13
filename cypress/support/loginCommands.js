import login from '../models/loginModule'
import sidebar from '../models/sidebarModule'
import navigation from '../models/navigationModule'

Cypress.Commands.add('login', ({email = Cypress.env('username'), password = Cypress.env('password')}) => {
    cy.intercept('POST', '**api/v2/login').as('login')
    if(email !== ""){
        login.emailInput.should('be.visible').clear().type(email)
    }
    if(password !== ""){
        login.passwordInput.should('be.visible').clear().type(password)
    }
    login.loginButton.click()
    if(email === Cypress.env('username') && password === Cypress.env('password')){
        cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    }
}),

Cypress.Commands.add('logout', () => {
    sidebar.userButton.click()
    sidebar.profileButon.click()
    navigation.logoutButton.click()
})

