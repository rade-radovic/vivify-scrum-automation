module.exports = {
    get logoutButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']")
    },
    get showSearch() {
        return cy.get(".vs-c-project-search > .el-tooltip.vs-c-btn.vs-c-btn--link")
    },
    get searchInput() {
        return cy.get("form > input[type='text']")
    },
    get showFinishedSprints() {
        return cy.get("button[name='show_finished_sprints']")
    },
    get toggleView() {
        return cy.get(".vs-c-sprint-info > button:nth-of-type(2)")
    },
    get moreOptions() {
        return cy.get(".el-dropdown > .el-tooltip.vs-c-btn.vs-c-btn--link")
    },
    get showFilters() {
        return cy.get(".vs-c-dropdown-wrapper.vs-c-filter > .el-badge.el-tooltip > .vs-c-btn.vs-c-btn--link")
    },
    get notifications() {
        return cy.get(".vs-c-dropdown-wrapper.vs-c-notification > .el-badge.el-tooltip > .vs-c-btn.vs-c-btn--link")
    },
    get help() {
        return cy.get(".vs-l-project__options > .el-tooltip.vs-c-btn.vs-c-btn--link")
    },
    get scrumLogo() {
        return cy.get("div[class='vs-c-site-logo vs-u-cursor--pointer']")
    }
}