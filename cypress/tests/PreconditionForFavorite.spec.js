import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    beforeEach(() => {
        cy.login('TamaraUser48')
            .wait(2000)
    })


   
    it('Should be able to successfully create new private, public and sponsored Video album', () => {
        //private video
        var name = reqConditions.makeid(7)
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PRIVATEALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.newUploadVideo('testvideo2.mp4')

        cy    
            .get(locators.VIDEO.NAME).type(name)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(8000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')
        //public video
        cy
            .get(locators.VIDEO.PUBLICALBUMS).click()
            for ( var i = 0; i < 2; i++ ){
                    
                cy.wait(2000)
                    .get(locators.VIDEO.CREATENEWALBUM).click()
    
                cy.newUploadVideo('testvideo.mp4')
                cy.newUploadVideo('testvideo2.mp4')

                var name1 = reqConditions.makeid(7)

                cy .get(locators.VIDEO.NAME).type(name1)
                    .get(locators.VIDEO.UPLOAD).click()
                    .wait(8000)
                    .get(locators.VIDEO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')

                }
                
        //sponsored video
        cy  .wait(4000)
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
            for ( var i = 0; i < 2; i++ ){
                    
                cy.wait(2000)
                    .get(locators.VIDEO.CREATENEWALBUM).click()
        
                cy.newUploadVideo('testvideo.mp4')
                cy.newUploadVideo('testvideo2.mp4')
                
                var name3 = reqConditions.makeid(7)
                
                cy.get(locators.VIDEO.NAME).type(name3)
                    .get(locators.VIDEO.UPLOAD).click()
                    .wait(8000)
                    .get(locators.VIDEO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')

                    }
                    
    })

    it('Should be able to successfully create new private public and sponsored photo album', () => {
        //private photo
        cy
            .get(locators.PHOTO.PAGE).click()    
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto1.jpg')
        cy.newUploadPhoto('testphoto2.jpg')

        var name = reqConditions.makeid(7)
        cy    
            .get(locators.PHOTO.NAME).type(name)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

        //public photo
        cy
            .get(locators.PHOTO.PUBLICALBUMS).click()
            for ( var i = 0; i < 2; i++ ){

                cy.wait(1000)
                    .get(locators.PHOTO.CREATENEWALBUM).click()
    
                cy.newUploadPhoto('testphoto2.jpg')
                cy.newUploadPhoto('testphoto5.jpg')
        
                var name = reqConditions.makeid(7)
                cy    
                    .get(locators.PHOTO.NAME).type(name)
                    .get(locators.PHOTO.UPLOAD).click()
                    .wait(4000)
                    .get(locators.PHOTO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible') 
            }
            
        //sponsored photo
        cy  
            .wait(1000)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            for ( var i = 0; i < 2; i++ ){
                cy.wait(1000)
                    .get(locators.PHOTO.CREATENEWALBUM).click()
        
                cy.newUploadPhoto('testphoto3.jpg')
                cy.newUploadPhoto('testphoto6.jpg')
        
                var name = reqConditions.makeid(7)
                cy 
                    .get(locators.PHOTO.NAME).type(name)
                    .get(locators.PHOTO.UPLOAD).click()
                    .wait(4000)
                    .get(locators.PHOTO.SPONSOREDALBUMS).click()
                    .get(locators.PHOTO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')
            }        

     })

    it('story making', () => {

        var name1 = reqConditions.makeid(15)
        var name2 = reqConditions.makeid(15)
        var name3 = reqConditions.makeid(15)
        var name4 = reqConditions.makeid(15)

        reqConditions.createPrivateStory(name1)
        cy.wait(1000)
        reqConditions.photoVideoStory(name2)
        cy.wait(1000)
        reqConditions.createPrivateStory(name3)
        cy.wait(1000)
        reqConditions.photoVideoStory(name4)
        cy.wait(1000)
            
    })

    it('Store making', () => {
      
        cy  
            .get(locators.STORE.PAGE).click()
            for ( var i = 0; i < 2; i++ ){

                var name = reqConditions.makeid(15)
                reqConditions.newStoreVideo(name, 1)
                cy.wait(1000)
            }

            for ( var i = 0; i < 2; i++ ){

                var name1 = reqConditions.makeid(15)
                reqConditions.newStoreFile(name1, 1)
                cy.wait(1000)
            }

            for ( var i = 0; i < 4; i++ ){

                var name2 = reqConditions.makeid(15)
                reqConditions.newStorePhoto(name2, 1)
                cy.wait(1000)
            }    
            
    })


})