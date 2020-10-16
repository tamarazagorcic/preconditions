import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for videos upload, edit and delete', () =>{

    var creator = 'Tamara'
    var sponsor = 'TamaraTest'
    var nonsponsor = 'TamaraUser104'
    var name = reqConditions.makeid(7) 
    var name1 = reqConditions.makeid(7)
    var name2 = reqConditions.makeid(7)
    var videoText = ' Added a new video to the store '
    var photoText = ' Added new content to the store photo album '
    var fileText = ' Added a new file to the store '


    it('Should be able to successfully upload new store video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
             
        reqConditions.newStoreVideo(name, "1")
               
    })
   
    it('Should see a store video upload', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' ,videoText )
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(' Store Videos ', { matchCase: false })
            
    })

    it('Should be able to successfully upload store photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
             
        reqConditions.newStorePhoto(name1, '1')
               
    })

    it('Should see a store photo album upload', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , photoText+name1+' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('Store Picture Sets', { matchCase: false })
            
    })
   
    it('Should be able to successfully edit name of store video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
             
        reqConditions.editStoreVideoName(name, "Edit " + name)
               
    })
   
    it('Store Video Name Edit should not trigger cards to change place', () => {
        cy.login(sponsor)
        .wait(2000)

    var locator = "userName-"+creator
    cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
        .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , videoText)
        .wait(2000)
        .get(locators.FEED.CARD).eq(1).click()
        .wait(1500)
        .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
        .get('h2').contains(' Store Videos ', { matchCase: false })
            
    })

    it('Should be able to successfully upload store file', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
             
        reqConditions.newStoreFile(name2, '1')
               
    })

    it('Should see a store file upload', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , fileText)
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(' Store Files ', { matchCase: false })
            
    })

    // it('Should be able to successfully edit name of store photo album', () => {
    //     cy.login(creator)
    //         .wait(2000)
    //         .get(locators.STORE.PAGE).click()
            
             
    //     reqConditions.editStorePhotoName(name1, "Edit")
               
    // })

    // it('Edit store photo album should be visible but not to trigger card position change', () => {
        
    //     cy.login(sponsor)
    //         .wait(2000)

    //     var locator = "userName-"+creator
    //     cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
    //         .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , ' Added new content to the store photo album Edit ')
    //         .wait(2000)
    //         .get(locators.FEED.CARD).eq(1).click()
    //         .wait(1500)
    //         .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
    //         .get('h2').contains('Store Picture Sets', { matchCase: false })
            
    // })
    
    it('Should be able to successfully add photo to store photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
            
             
        reqConditions.addPhotoToStorePhotoALbum(name1)
               
    })

    it('Adding photo should trigger card position change', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , photoText+name1+' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('Store Picture Sets', { matchCase: false })
            
    })

    it('Should be able to successfully edit name of store file', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
            
             
        reqConditions.editStoreFileName(name2, "Edit " + name2)
               
    })

    it('Store File Name edit should not trigger card change', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , fileText)
            .wait(2000)
            .get(locators.FEED.CARD).eq(1).click()
            .wait(1500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(' Store Files ', { matchCase: false })
            
    })


    it('Should be able to successfully delete store photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
            .get(locators.STORE.MYPHOTOTAB).click()
        
            reqConditions.deleteStorePhotoAlbum(name1)
                     
    })

    it('Should not see a deleted store photo album on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , photoText+name1+' ')
                        
    })

    it('Should be able to successfully delete store file', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
            
        
            reqConditions.deleteStoreFile(name2)
        
               
    })

    it('Should not see a deleted store file on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , fileText)
                        
    })

    it('Should be able to successfully delete store video', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.STORE.PAGE).click()
            
        
            reqConditions.deleteStoreVideo(name)
        
               
    })

    it('Should not see a deleted store video on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , videoText)
                        
    })


    


})