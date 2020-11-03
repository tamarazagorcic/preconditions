import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for checking Activity Feed for Wall posts upload, edit and delete', () =>{

    var creator = 'TamaraUser22'
    var sponsor = 'TamaraTest'
    var text = reqConditions.makeid(77) 
    var text1 = reqConditions.makeid(37)
    var comment ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget mattis lectus. Nullam hendrerit molestie nulla sit amet rhoncus'
    var text2 = reqConditions.makeid(47)
    var name = reqConditions.makeid(7)
    var WallText = ' Made a new wall post '
    

    it('Should be able to successfully create new text post', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.publicPhotoAlbum(name)     
        reqConditions.textWallPost(text)
               
    })
   
    it('Should see a wall post created card', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , WallText)
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains('wall', { matchCase: false })
            
    })

    it('Should be able to successfully edit text post', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.editWallPost(text1)
               
    })

    it('Edit of wall post should not trigger new card', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , WallText)
            .wait(2000)
       
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('not.include.text' , WallText)    
            
    })

    it('Should be able to successfully comment on text post', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.comentOwnWallPost(comment)
               
    })

    it('Comment should not trigger new wall post', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , WallText)
            .wait(2000)
        
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('not.include.text' , WallText)    
            
    })

    it('Should be able to successfully create new posts', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.photoWallPost('testphoto3.jpg')    
        cy.wait(2000)
        reqConditions.videoWallPost('testvideo2.mp4')
        cy.wait(2000)
        reqConditions.photoTextWallPost(text1, 'testphoto5.jpg')
        cy.wait(2000)
        reqConditions.videoTextWallPost(text2, 'testvideo.mp4')
               
    })

    it('Should be able to see all wall posts cards', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , WallText)
            .wait(2000)
       
        cy.get('[taglimpse='+locator+"]").eq(1).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(1).should('include.text' , WallText)
            
        cy.get('[taglimpse='+locator+"]").eq(2).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(2).should('include.text' , WallText)
               
        cy.get('[taglimpse='+locator+"]").eq(3).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(3).should('include.text' , WallText)

            
        cy.get('[taglimpse='+locator+"]").eq(4).should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).eq(4).should('include.text' , WallText)
            
    })

    it('Should be able to successfully delete new posts', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.deleteWallPost()    
        cy.wait(1000)
            .get(locators.PHOTO.PAGE)
        reqConditions.deleteWallPost() 
        cy.wait(1000)
            .get(locators.PHOTO.PAGE)
        reqConditions.deleteWallPost() 
        cy.wait(1000)
            .get(locators.PHOTO.PAGE)
        reqConditions.deleteWallPost()
        cy.wait(1000)
            .get(locators.PHOTO.PAGE)
        reqConditions.deleteWallPost() 
        
               
    })

    it('No wall posts cards should be visible', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('not.include.text' , WallText)
            .wait(2000)
        
            
    })

    it('Should be able to successfully delete public photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
        
            reqConditions.deletePhotoAlbum(name)
        
               
    })
    
    

})