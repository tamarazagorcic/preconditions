import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for videos upload, edit and delete', () =>{

    var creator = 'TamaraUser22'
    var sponsor = 'TamaraTest'
    var nonsponsor = 'TamaraUser104'
    var name = reqConditions.makeid(7) 
    var name1 = reqConditions.makeid(7)
    var name2 = reqConditions.makeid(7)
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


    it('Should be able to successfully upload new video', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.publicVideoAlbum(name)
               
    })
   
    it('Should see a public video uploaded', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new video ' + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.VIDEO.GALERYCLOSE).click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name)
            
    })

    it('Should be able to successfully upload new sponsored video', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.sponsoredVideoAlbum(name1)
               
    })
   
    it('Sponsor should see a sponsored video uploaded', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new video ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.VIDEO.GALERYCLOSE).click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name1)
            
    })

    it('Non sponsor should see a sponsored tab', () => {
        
        cy.login(nonsponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new video ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name1)  
            
    })

    it('Should be able to successfully upload new private video', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.privateVideoAlbum(name2)
               
    })
   
    it('Should not see a private video uploaded', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new video ' + name2 +' ')
                        
    })

    xit('Should be able to successfully edit name of public video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.VIDEO.PAGE).click()
             
        reqConditions.editName(name, "Edit " + name)
               
    })
   
    xit('Should see a public video uploaded but cards do not change place', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , ' Added new video Edit ' + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).eq(1).click()
            .wait(1500)
            .get(locators.VIDEO.GALERYCLOSE).click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , "Edit " + name)
            
    })


    it('Should be able to successfully delete sponsored video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
        
            reqConditions.deleteVideo(name1)
        
               
    })

    it('Should not see a deleted sponsored video on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new video Edit ' + name1 +' ')
                        
    })

    it('Should be able to successfully delete public video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.VIDEO.PAGE).click()
        
            reqConditions.deleteVideo(name)
        
               
    })

    it('Should not see a deleted public video on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new video Edit ' + name +' ')
                        
    })


    


})