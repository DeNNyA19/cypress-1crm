// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-real-events/support";
require('@cypress/xpath');

Cypress.Commands.add('loginViaApi', (username, password) => {
    cy.request('POST', `${Cypress.config('baseUrl')}/json.php?action=login`, {
      username: username, 
      password: password,
      theme: `${Cypress.config('theme')}`,
      no_persist_theme: 1,
      login_module: 'Home',
      login_action: 'index',
      language: `${Cypress.config('language')}`,
      res_height: 714,
      res_width: 950,
      gmto: -420
    })
    cy.intercept('POST', '/async.php?action=DisplayDashlet&module=Home&**').as('displayDashletHomeReq')
    cy.visit('index.php?module=Home&action=index')
    cy.wait('@displayDashletHomeReq')
    cy.get('#main-title-module').contains('Home Dashboard')
})

Cypress.Commands.add('openMenu', (mainMenuEl, subMenuEl) => {
    cy.get(`[data-tab-id=LBL_TABGROUP_${mainMenuEl}]`).realHover('mouse')
    cy.contains(subMenuEl).click()
    cy.get('#main-title-module').scrollIntoView().contains(subMenuEl)
})  