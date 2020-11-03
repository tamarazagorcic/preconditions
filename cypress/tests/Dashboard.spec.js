import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for testing Dashboard', () =>{

    var Tamara = 'TamaraUser49'
    var sender = 'TamaraUser48'
    var newElem = "blabla"
       
       
    it('Should be able to check dashboard cards', () => {

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
            newElem = amount + " tokens"
            cy.get(locators.TOKENS.TEXT).should('have.text', newElem)
                     
            cy.get(locators.DASHBOARDINFO.TEXTONCARD).eq(2).click()
            cy.get(locators.DASHBOARDINFO.TOKENSPAGE).scrollIntoView().should('be.visible')
            
                })
                 
    })

   
    it('my Recent Story on Dashboard', () => {
        cy.login(Tamara)
            .wait(2000)
        
        var name = reqConditions.makeid(7)    
        reqConditions.createNewStory(name)
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Stories', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.RECENTSYORY).first().should('be.visible')
            .get(locators.DASHBOARDINFO.RECENTSYORYNAME).first().should('include.text' , name)
            .get(locators.DASHBOARDINFO.RECENTSYORYIMG).first().click()
            .get(locators.STORY.NEWSTORYNAME).should('be.visible')
            .get(locators.STORY.CANCEL).click()
            .get(locators.DASHBOARDINFO.VIEWALLSTORIES).click()
            .wait(1000)
            .get(locators.STORY.ACTIVESTORYTAB).click()
            .wait(500)
            .get(locators.STORY.STORYNAME).first().should('include.text' , name)

        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get('h3').contains('My Recent Stories', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.DELETERECENTSYORY).first().should('be.visible').click()
            .get(locators.STORY.CONFIRMDELETESTORYBTN).click()
            .wait(3000)
            .get(locators.DASHBOARDINFO.NOSTORIES).should('include.text' , 'No recent stories available')

                                
    })

    it('my Recent Photo Albums on Dashboard', () => {
        cy.login(Tamara)
            .wait(2000)
        var name = reqConditions.makeid(7)    
        reqConditions.publicPhotoAlbum(name)
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(3000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Photo Albums', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.ALBUM).first().should('be.visible')
        var locator = "albumName-"+name
        cy    .get('[taglimpse='+locator+"]").first().should('include.text' , name)
            .get(locators.DASHBOARDINFO.ALBUMIMG).first().click()
            .wait(1000)
            .get('h2').contains(name, { matchCase: false })
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Photo Albums', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.VIEWALLPHOTOALBUM).click()
            .wait(500)
            .get(locators.PHOTO.PUBLICALBUMS).should('be.visible')
            .wait(3000)
            .get(locators.PHOTO.ALBUMNAMETEXT).first().should('include.text' , name)
        cy
            .get(locators.PHOTO.MEDIAALBUM).first().click()
            .wait(1000)
            .get(locators.PHOTO.DELETEALBUM).click()
            .get(locators.PHOTO.CONFIRMBTN).click()
        cy  
            .wait(2000)
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get(locators.DASHBOARDINFO.NOALBUMS).first().scrollIntoView().should('be.visible')

        
    })

    it('my Recent Videos on Dashboard', () => {
        cy.login(Tamara)
            .wait(2000)
        
        var name = reqConditions.makeid(7)    
        reqConditions.publicVideoAlbum(name)
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(3000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Videos', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.ALBUM).eq(0).should('be.visible')
            var locator = "albumName-"+name
        cy    .get('[taglimpse='+locator+"]").should('include.text' , name)
            .get(locators.DASHBOARDINFO.ALBUMIMG).eq(0).click()
            .wait(1000)
            .get(locators.VIDEO.GALERYCLOSE).eq(0).click()
            .wait(1000)
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Videos', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.VIEWALLVIDEOALBUM).click()
            .wait(500)
            .get(locators.VIDEO.PUBLICALBUMS).should('be.visible')
            .wait(3000)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name)
        cy
            .get(locators.VIDEO.OPTIONS).first().click()
            .wait(1000)
            .get(locators.VIDEO.DELETEVIDEO).click()
           
        cy  
            .wait(2000)
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(1000)
            .get(locators.DASHBOARDINFO.NOALBUMS).last().scrollIntoView().should('be.visible')
            
        })

    it('my Recent Contacts setup', () => {

        cy.login(sender)
            .wait(2000)
        reqConditions.sendFriendRequestWithout(Tamara)
                               
    })

    it('my Recent Contacts', () => {

        cy.login(Tamara)
            .wait(2000)
        
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender)
            .get(locators.CONTACTS.INCOMINGACCEPT).first().click()
            .wait(500)
        
        cy  
            .get(locators.HEADER.HAMMENU).scrollIntoView().click()
            .get(locators.HAMBURGERMENU.DASHBOARD).scrollIntoView().click()
            .wait(3000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Contacts', { matchCase: false }).scrollIntoView()
            .get(locators.DASHBOARDINFO.USERNAME).first().should('contain.text', sender)
            .get(locators.DASHBOARDINFO.PROFILEIMG).first().should('be.visible')
            .get(locators.DASHBOARDINFO.GOTOPROFILE).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', sender)
        
                           
    })

    it('my Recent Sponsores setup', () => {

        cy.login(sender)
            .wait(2000)
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Users').click()
            .get(locators.CONTACTS.SERARCHINPUT).clear().type(Tamara)
            .wait(500)
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', Tamara).click()
            .get(locators.DASHBOARD.SPONSORME).click()
            //here we should add a level name
            var locator = "TestLevel"+"SelectButton"
        cy  .get('[taglimpse='+locator+"]").click()
           
            .get(locators.SPONSORSHIP.CONFIRMSPON).click()
                               
    })

    it('my Recent Sponsors', () => {

        cy.login(Tamara)
            .wait(2000)
        
        cy
            .get(locators.DASHBOARD.DASHBOARD).click()
            .wait(3000)
            .get('h2').contains('my dashboard', { matchCase: false })
            .get('h3').contains('My Recent Sponsors', { matchCase: false }).scrollIntoView()
            //here we can add assertation for price and level name
            .get(locators.DASHBOARDINFO.RECENTSPONSORNAME).first().should('contain.text', sender)
        
                           
    })

    it('my Recent Contacts after all setup', () => {
        cy.login(sender)
            .wait(3000)
            .visit('/glimpsed/users')
        reqConditions.blockUser(Tamara)
        cy.wait(500)
        cy.get(locators.CONTACTS.TABS).contains('Blocked users').click()
        cy.wait(1000)
        reqConditions.unblockUser(Tamara)
                           
    })

    
})