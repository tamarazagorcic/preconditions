import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for photo albums upload, edit and delete', () =>{

    var creator = 'TamaraUser22'
    var sponsor = 'TamaraTest'
    var nonsponsor = 'TamaraUser104'
    var name = reqConditions.makeid(7) 
    var name1 = reqConditions.makeid(7)
   var storyText = ' Updated story '


    it('Should be able to successfully create new story', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.createNewStory(name)
               
    })
   
    it('Should see a story created card on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , storyText + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(2000)
            .get(locators.STORY.STORYPHOTO).should('be.visible')
            .get(locators.STORY.STORYUSERNAME).should('contain.text', creator)
            .get(locators.STORY.CLOSESTORY).click()
            .wait(1000)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('stories', { matchCase: false })
            
    })

    it('Should be able to successfully create new story with sponsored part', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.createPrivateStoryWithLevels(name1)
               
    })
   
    it('Sponosr should see a sponsored part of story', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , storyText + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(4000)
            .get(locators.STORY.STORYPHOTO).should('be.visible')
            .get(locators.STORY.STORYUSERNAME).should('contain.text', creator)
            .get(locators.STORY.NEXTCONTENTBTN).eq(0).click()
            .get(locators.STORY.NEXTCONTENTBTN).eq(1).click()
            .get(locators.SPONSORSHIP.STORY).should('not.be.visible')
            .get(locators.STORY.CLOSESTORY).click()
            .wait(1000)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('stories', { matchCase: false })
            
    })

    it('Non sponosor should not see a sponsored part of story', () => {
        
        cy.login(nonsponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , storyText + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(4000)
            .get(locators.STORY.STORYPHOTO).should('be.visible')
            .get(locators.STORY.STORYUSERNAME).should('contain.text', creator)
            .get(locators.STORY.NEXTCONTENTBTN).eq(0).click()
            .get(locators.STORY.NEXTCONTENTBTN).eq(1).click()
            .get(locators.SPONSORSHIP.STORY).should('be.visible')
            .get(locators.STORY.CLOSESTORY).click()
            .wait(1000)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('stories', { matchCase: false })
            
    })

    it('Should be able to successfully update archived story', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.updateArchivedStory()
               
    })

    it('Should be able to see updated archived story', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , storyText)
            .wait(2000)
       
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , storyText + name1 +' ')
            
        cy.get('[taglimpse='+locator+"]").eq(2).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(2).should('include.text' , storyText + name +' ')
               
                    
    })

    
    it('Should be able to delete stories', () => {
        cy.login(creator)
            .wait(2000) 
            .get(locators.STORY.PAGE).click()
            .wait(2000)
            .get(locators.STORY.ACTIVESTORYTAB).click()
            .wait(1000)    
        reqConditions.deleteStory()
        cy.wait(4000)
        reqConditions.deleteStory()
               
    })

    it('Deleted stories should not be visible on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , storyText)
            .wait(2000)
       
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('not.include.text' , storyText + name1 +' ')
            
        cy.get('[taglimpse='+locator+"]").eq(2).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(2).should('not.include.text' , storyText + name +' ')
               
                    
    })

    
})