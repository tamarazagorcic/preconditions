///<reference types="Cypress" />
import 'cypress-file-upload'
const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')



describe('This is a scipt for checking Recent Activities for Broadcast', () =>{

    let creator = 'Test3'
    let sponsor = 'Test9'
    let text = 'Broadcast Has Ended'

 

    it('Should be able to start broadcast', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.startBroadcast()     
        
               
    })
   
    it('Should see a broadcast icon created', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)


            .get(locators.RA.BROADCAST).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h3').should('contain.text',text)
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
            .wait(4000)
            .visit("/"+creator)
            .get(locators.RA.ITEM).eq(0).click()
            .get('h3').should('contain.text',text)
            .get(locators.BROADCAST.BACTOPROFILE).click()
            .get(locators.RA.ITEM).eq(0).click()
            .get('h3').should('contain.text',text)
            
          
            
            
    })

    

})