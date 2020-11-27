import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for broadcast check', () =>{

    beforeEach(() => {
        cy.login('Tamara')
            .wait(2000)
    })


   
    it('Should be able to successfully create new private, public and sponsored Video album', () => {
    
        cy
            .visit('/user/feed')
            .get(locators.BROADCAST.PAGE).click()
            .get(locators.BROADCAST.START).click()
            .wait(1000)
            .get(locators.BROADCAST.RECORD).click()
            .wait(5000)
            .get(locators.BROADCAST.ANNOUNCE).click()
            .wait(1500)
            .get(locators.BROADCAST.END).click()
                    
    })

   

})