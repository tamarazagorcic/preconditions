import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for testing Dashboard', () =>{

    var Tamara = 'Tamara'
    var receiver = 'TamaraUser48'
    var receiver1 = 'TamaraUser45'
    var receiver2 = 'TamaraUser41'
    var newElem = "blabla"
    var newEle
    var text1 = 'This is automation friend request with tokens test message'
    var message = 'This is message for check'
    var responsToFR = 'This is response for friend request'
    
   
    it.only('Should cancel sending friend request and send friend request from user profile', () => {
        
        cy.login(Tamara)
            .wait(2000)

        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('basic information', { matchCase: false })
            .get(locators.DASHBOARDINFO.TEXTONCARD).eq(0).should('include.text' , 'My Contacts').scrollIntoView()
                     
        cy.get(locators.DASHBOARDINFO.VALUEONCARD).eq(0).invoke('text').then( newEle => {
            newElem = " " + newEle + " total "
            cy.log(newElem)
            cy.get(locators.DASHBOARDINFO.TEXTONCARD).eq(0).click()
            cy.get(locators.DASHBOARDINFO.NUMBERCONTACTS).scrollIntoView()
            cy.get(locators.DASHBOARDINFO.NUMBERCONTACTS).should('have.text', newElem)               
            })

        cy  
            .get(locators.HEADER.HAMMENU).scrollIntoView().click()
            .get(locators.HAMBURGERMENU.DASHBOARD).scrollIntoView().click()
            .wait(1000)
            .get(locators.DASHBOARDINFO.TEXTONCARD).eq(1).should('include.text' , 'People who sponsor me').scrollIntoView()
            .get(locators.DASHBOARDINFO.TEXTONCARD).eq(1).click()
            .get('h3').contains('People who sponsor me', { matchCase: false }).scrollIntoView()
        
        cy  
            .get(locators.HEADER.HAMMENU).scrollIntoView().click()
            .get(locators.HAMBURGERMENU.DASHBOARD).scrollIntoView().click()
            .wait(1000)
            .get(locators.DASHBOARDINFO.TEXTONCARD).eq(2).should('include.text' , 'Token amount').scrollIntoView()
        cy.get(locators.DASHBOARDINFO.VALUEONCARD).eq(2).invoke('text').then( amount => {
            
                cy.log(amount)
                cy.get(locators.DASHBOARDINFO.TEXTONCARD).eq(2).click()
                cy.get(locators.DASHBOARDINFO.TOKENSPAGE).should('be.visible')
                cy.get(locators.DASHBOARDINFO.PURCHASED).invoke('text').then(purchased =>{
                    cy.log(purchased)
                })
                cy.get(locators.DASHBOARDINFO.RECEIVED).invoke('text').then(received =>{
                    cy.log(received)
                })
                
                
                })
                 
    })

   
    it('Should be able to view request with tokens and decline request from popup', () => {
        
        
                                
    })

    it('Preparing for last check', () => {
        
        
    })

    it('Should be able to check nottifications for requests and messges and respond to request with tokens', () => {
        
     
        
        
                           
    })

    
})