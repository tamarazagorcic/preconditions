

import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    var sender = 'Tamara'
    var sender1 = 'TamaraTest'
    var receiver = 'TamaraUser49'
    var text = '' 
    var text1 = 'This is first send message and should be last on the list'
    var text2 = 'This is second send message and should be first on the list'  
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


   
    it('tetstststst', () => {

        cy.log("hdkfhskfhsdkfhskfhskhsdhfdsffffffffffffffffffffffffffffff")
        
        let body = cy.getBody("tamaraz+4@glimpse.me")

        cy.log("hdkfhskfhsdkfhskfhskhsdhfdsffffffffffffffffffffffffffffff")

        //cy.getTextMessagesToAll(sender1)
        // let username = cy.getTextMessagesToAll(sender1)

        // cy.log(username)
        
    
       //  cy.login(sender)
        //     .wait(2000)

        // cy
        //     .get(locators.HEADER.HAMMENU).click()
        //     .get(locators.HAMBURGERMENU.CONTACTS).click()
        //     .get(locators.CONTACTS.TABS).contains('Users').click()
        //     .get(locators.CONTACTS.SERARCHINPUT).type(receiver)
        //     .get(locators.CONTACTS.SERARCHRESULT).click()
        //     .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', receiver)

        // cy
        //     .get(locators.MESSAGES.PAGE).click()
        //     .get(locators.MESSAGES.BACKTOMYMESSAGES).should('be.visible')
        //     .get(locators.MESSAGES.INPUT).type(text)
        //     .get(locators.MESSAGES.SEND).click()
        //     .get(locators.MESSAGES.TEXTCHECK).should('contain.text', text)
        //     .get(locators.MESSAGES.TIMECHECK).last().should('be.visible')
        //     .get(locators.MESSAGES.DATE).last().should('contain.text', 'Today')
                    
    })

    


  

 


})