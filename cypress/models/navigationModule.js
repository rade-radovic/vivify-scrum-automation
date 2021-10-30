module.exports = {
    get logoutButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']")
    }
}