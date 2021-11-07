import faker from 'faker'
import data from '../fixtures/data.json'
import register from '../models/registerModule'

Cypress.Commands.add('register', ({
    email = faker.internet.email(),
    password = data.user.password,
    numberOfUsers = data.registerData.numberOfUsers,
    clickTermsCheckbox = false
}) => {
    if(email !== ""){
        register.emailInput.should('be.visible').clear().type(email)
    }
    if(password !== ""){
        register.passwordInput.should('be.visible').clear().type(password)
    }
    if(numberOfUsers !== ""){
        register.numberOfUsersInput.type(numberOfUsers)
    }
    if(clickTermsCheckbox === true){
        register.termsCheckbox.click()
    }
    register.signUpButton.click()
})