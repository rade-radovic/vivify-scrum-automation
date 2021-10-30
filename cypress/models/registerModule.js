import data from '../fixtures/data.json'
import faker from 'faker'

module.exports = { 
    get backToPricing() {
        return cy.get("span[class='vs-u-text--uppercase vs-c-auth-modal__body-text vs-u-font-lg vs-u-gap--left-sm']")
    },
    get emailInput() {
        return cy.get("[data-vv-as='email']")
    },
    get passwordInput() {
        return cy.get("input[type='password']")
    },
    get numberOfUsersInput() {
        return cy.get("[data-vv-as='number of users']")
    },
    get termsCheckbox() {
        return cy.get("span[class='vs-c-checkbox-check']")
    },
    get signUpButton() {
        return cy.get("button[type='submit'")
    },
    get loginLink() {
        return cy.get("strong[class='vs-c-auth-modal__bottom-text-main vs-u-text--uppercase']")
    },
    get growtSignUp() {
        return cy.get(".vsp-c-pricing-plan-list.vsp-c-pricing-plan-list--annual > li:nth-of-type(3) > a[title='Growth']")
    },
    get errorMessage() {
        return cy.get("span[class='el-form-item__error el-form-item-error--top']")
    },

    register({
        email = faker.internet.email(),
        password = data.user.password,
        numberOfUsers = data.registerData.numberOfUsers,
        clickTermsCheckbox = false
    }){
        if(email !== ""){
            this.emailInput.should('be.visible').clear().type(email)
        }
        if(password !== ""){
            this.passwordInput.should('be.visible').clear().type(password)
        }
        if(numberOfUsers !== ""){
            this.numberOfUsersInput.type(numberOfUsers)
        }
        if(clickTermsCheckbox === true){
            this.termsCheckbox.click()
        }
        this.signUpButton.click()
    }
}