import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for Wall posts upload, edit and delete', () =>{

    var creator = 'Tamara'
    var sponsor = 'TamaraTest'
    var broadcastText = ' Started a new broadcast '
 

    it('Should be able to start broadcast', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.startBroadcast()     
        
               
    })
   
    it('Should see a broadcast post created card', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.PAGE).click()

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , broadcastText)
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1000)
            .get('h3').contains('Broadcast Has Ended', { matchCase: false })
            .get(locators.BROADCAST.BACTOPROFILE).click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            
            
    })

    it('Should be able to start broadcast', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.startBroadcast()     
        
               
    })

    it('Should see a broadcast post created card', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.PAGE).click()
            var locator = "userName-"+creator
            cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
                .get(locators.FEED.CARDTEXT).first().should('include.text' , broadcastText)
                .wait(2000)
           
            cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
                .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , broadcastText)
            
            
    })

    

})