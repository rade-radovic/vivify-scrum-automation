import data from '../fixtures/data.json'
import sidebar from '../models/sidebarModule'
import navigation from '../models/navigationModule'

module.exports = {
    get emailInput() {
        return cy.get("[data-vv-as='email']")
    },
    get passwordInput() {
        return cy.get("input[type='password']")
    },
    get loginButton() {
        return cy.get("button[type='submit']")
    },
    get forgotPassword() {
        return cy.get("a[href='/forgot-password']")
    },
    get backToHomeLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com']")
    },
    get signUpLink() {
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com/pricing']")
    },
    get errorMessage() {
        return cy.get("span[class='el-form-item__error el-form-item-error--top']")
    },
    get backendErrorMessage() {
        return cy.get("span[class='el-form-item__error']")
    },

    login({
        email = data.user.email,
        password = data.user.password
    }){
        cy.intercept('POST', '**api/v2/login').as('login')
        if(email !== ""){
            this.emailInput.should('be.visible').clear().type(email)
        }
        if(password !== ""){
            this.passwordInput.should('be.visible').clear().type(password)
        }
        this.loginButton.click()
        if(email === data.user.email && password === data.user.password){
            cy.wait('@login').then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
            })
        }
    },

    logout(){
        sidebar.userButton.click()
        sidebar.profileButon.click()
        navigation.logoutButton.click()
    }
}