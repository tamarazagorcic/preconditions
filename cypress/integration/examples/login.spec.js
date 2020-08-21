const locators = require('../../fixtures/locators.json')

describe('This test checks if login feature works as expected', () => {

    // let url = env.ENVIRONMENT.URL

    before(() => {
        cy.visit()
    })

    it('Should be sucessfully logged in the Glimpse system', () => {
       cy 
        .get(locators.LOGIN.email).type("tamaraz+723@glimpse.me")
        .get(locators.LOGIN.password).type("Test1234")
        .get(locators.LOGIN.loginBtn).click()
     
    })

    after(() => {
        cy.clearLocalStorage()
    })
})
