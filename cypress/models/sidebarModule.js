module.exports = {
    get userButton() {
        return cy.get("a img", {timeout : 600000})
    },
    get profileButon() {
        return cy.get("a[href='/account/settings']")
    }
}