module.exports = {
    get logoutButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']")
    },
    get scrumLogo() {
        return cy.get("div[class='vs-c-site-logo vs-u-cursor--pointer']")
    }
}