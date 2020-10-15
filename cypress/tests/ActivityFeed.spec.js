import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for photo albums upload, edit and delete', () =>{

    var creator = 'Tamara'
    var sponsor = 'TamaraTest'
    var nonsponsor = 'TamaraUser104'
    var name = reqConditions.makeid(7) 
    var name1 = reqConditions.makeid(7)
    var name2 = reqConditions.makeid(7)
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


    it('Should be able to successfully create new public photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.publicPhotoAlbum(name)
               
    })
   
    it('Should see a public photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name, { matchCase: false })
            
    })

    it('Should be able to successfully create new sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.sponsoredPhotoAlbum(name1)
               
    })
   
    it('Sponsor should see a sponsored photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name1, { matchCase: false })
            
    })

    it('Non sponsor should see a sponsored tab', () => {
        
        cy.login(nonsponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
        var locator1 = "albumName-"+name1
            cy.get('[taglimpse='+locator1+"]").first().should('include.text' , name1)    
            
    })

    it('Should be able to successfully create new private photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.privatePhotoAlbum(name2)
               
    })
   
    it('Should not see a private photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new content to photo album ' + name2 +' ')
                        
    })

    it('Should be able to successfully add photo to public photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
        
            reqConditions.addPhoto(name, 'testphoto4.jpg')
        cy.wait(2000)
               
    })

    it('Should see a new photo in public album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name, { matchCase: false })
            .wait(1000)
            .get(locators.PHOTO.FAVORITE).eq(2).should('be.visible')
            
    })

    it('Should be able to successfully add photo to sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
        
            reqConditions.addPhoto(name1, 'testphoto4.jpg')
        
               
    })

    it('Should see a new photo in sponsored album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name1, { matchCase: false })
            .wait(1000)
            .get(locators.PHOTO.FAVORITE).eq(2).should('be.visible')
            
    })

    it('Should be able to successfully delete sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
        
            reqConditions.deletePhotoAlbum(name1)
        
               
    })

    it('Should not see a deleted sponsored photo album on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new content to photo album ' + name1 +' ')
                        
    })

    it('Should be able to successfully delete public photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
        
            reqConditions.deletePhotoAlbum(name)
        
               
    })

    it('Should not see a deleted public photo album on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , ' Added new content to photo album ' + name +' ')
                        
    })


    


})