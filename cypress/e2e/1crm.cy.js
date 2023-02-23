import { faker } from '@faker-js/faker';
import { MainMenu, SalesMarketingMenu } from '../support/menu';
import { Contact } from '../support/contact';

describe('1CRM E2E tests', () => {

  beforeEach(() => {
    let testContact = new Contact()
    testContact.firstName = faker.name.firstName()
    testContact.lastName = faker.name.lastName()
    testContact.addCategories('Business', 'Customers')
    cy.wrap(testContact).as('testContact')
    cy.loginViaApi(Cypress.config('username'), Cypress.config('password'))
  })    

  it('Create contact', () => {
    cy.intercept('POST', '/json.php?action=status_check').as('statusCheckReq')
    cy.intercept('POST', '/json.php?action=get_country_states').as('getCountryStatesReq')
    cy.openMenu(MainMenu.SalesAndMarketing, SalesMarketingMenu.Contacts)
  
    cy.contains('Create Contact').click()
    cy.wait('@statusCheckReq')
    cy.wait('@getCountryStatesReq')

    cy.get('@testContact').then(testContact => {
      cy.get('#DetailFormfirst_name-input').type(testContact.firstName)
      cy.get('#DetailFormlast_name-input').type(testContact.lastName)
      testContact.categories.forEach(c => {
        cy.get('#DetailFormcategories-input').click()
        cy.xpath(`//*[@id='DetailFormcategories-input-search-list']//div[contains(@class, 'menu-option')][contains(., '${c}')]`).click()
      })
    })
    cy.contains('Save').click()

    cy.get('@testContact').then(testContact => {
      cy.get('h3').should('contain.text', `${testContact.firstname} ${testContact.lastname}`)
      cy.contains('Category').parent().should('contain.text', `${testContact.firstCategory },${testContact.secondCategory}`)
    })
  })
})