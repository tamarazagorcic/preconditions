///<reference types="Cypress" />
import 'cypress-file-upload'
const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')



describe('This is a scipt for checking Activity Feed for Wall posts upload, edit and delete', () =>{

    var creator = 'Tamara'
    var sponsor = 'TamaraTest'
    var broadcastText = ' Started a new broadcast '
 

    it('Should be able to start broadcast', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.startBroadcast()     
        
               
    })
   
    it('Should see a broadcast post created icon', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)


            .get(locators.RA.BROADCAST).should('be.visible')
            .get(locators.RA.ITEM).first().click()
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

    it.only('Should see a broadcast post created card', () => {
        
        cy.login(sponsor)
            .wait(4000)
            .visit("/"+creator)
            .get(locators.RA.MINIICON).eq(1).click({force: true})
            //.get('h3').contains('Broadcast Has Ended', { matchCase: false })
            .get(locators.BROADCAST.BACTOPROFILE).click()
            .get(locators.RA.MINIICON).eq(2).click({force: true})
            .get('h3').contains('Broadcast Has Ended', { matchCase: false })
            
        
            
            
            
    })

    

})