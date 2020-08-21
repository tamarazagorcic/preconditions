import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    beforeEach(() => {
        cy.login('Tamara')
            .wait(2000)
    })


   
    it('Should be able to successfully create new private, public and sponsored Video album', () => {
        //private video
        var name = reqConditions.makeid(7)
        var name2 = reqConditions.makeid(7)
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PRIVATEALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        

        cy    
            .get(locators.VIDEO.NAME).type(name)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

        cy
            .wait(1000)
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto3.jpg')

        cy    
            .get(locators.VIDEO.NAME).type(name2)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.GENERAL.SNACKBAR)
            .contains('Video successfully uploaded.')
            .should('be.visible') 
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

        //public video
        cy
            .get(locators.VIDEO.PUBLICALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()
    
                cy.newUploadVideo('testvideo.mp4')
               

            var name1 = reqConditions.makeid(7)

        cy .get(locators.VIDEO.NAME).type(name1)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.VIDEO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')

        cy
            .wait(1000)
            .get(locators.VIDEO.PUBLICALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()
            
                    cy.newUploadVideo('testvideo.mp4')
                    cy.uploadThumbnail('testphoto3.jpg')

            var name4 = reqConditions.makeid(7)
            
        cy.get(locators.VIDEO.NAME).type(name4)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.GENERAL.SNACKBAR)
                    .contains('Video successfully uploaded.')
                    .should('be.visible') 
            .get(locators.VIDEO.MEDIAALBUM)
                    .eq(0)
                    .scrollIntoView()
                    .should('be.visible')
            

                
                
        //sponsored video
        cy  .wait(4000)
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()
        
                cy.newUploadVideo('testvideo.mp4')
              
                
                var name3 = reqConditions.makeid(7)
                
        cy.get(locators.VIDEO.NAME).type(name3)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

        cy
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()
            
                cy.newUploadVideo('testvideo.mp4')
                cy.uploadThumbnail('testphoto3.jpg')

                var name5 = reqConditions.makeid(7)
            
        cy.get(locators.VIDEO.NAME).type(name5)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(6000)
            .get(locators.GENERAL.SNACKBAR)
                    .contains('Video successfully uploaded.')
                    .should('be.visible') 
            .get(locators.VIDEO.MEDIAALBUM)
                    .eq(0)
                    .scrollIntoView()
                    .should('be.visible')
                        
                    
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
        cy
            .wait(500)
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()
    
        cy.newUploadPhoto('testphoto1.jpg')
        cy.uploadThumbnail('testphoto6.jpg')

        var name1 = reqConditions.makeid(7)
    
        cy    
            .get(locators.PHOTO.NAME).type(name1)
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
            .get(locators.PHOTO.CREATENEWALBUM).click()
    
        cy.newUploadPhoto('testphoto2.jpg')
        cy.newUploadPhoto('testphoto5.jpg')
        
            var name2 = reqConditions.makeid(7)
        cy    
            .get(locators.PHOTO.NAME).type(name2)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible') 
        cy
            .get(locators.PHOTO.PAGE).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto2.jpg')
        cy.uploadThumbnail('testphoto6.jpg')

            var name3 = reqConditions.makeid(7)
        cy    
            .get(locators.PHOTO.NAME).type(name3)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')
  
            
        //sponsored photo
        cy  
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()
        
        cy.newUploadPhoto('testphoto3.jpg')
        cy.newUploadPhoto('testphoto6.jpg')
        
            var name4 = reqConditions.makeid(7)
        cy 
            .get(locators.PHOTO.NAME).type(name4)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')
        cy
            .wait(500)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto2.jpg')
        cy.uploadThumbnail('testphoto6.jpg')

            var name5 = reqConditions.makeid(7)

        cy    
            .get(locators.PHOTO.NAME).type(name5)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

                   

     })

     it('Should be able to post a wall post', () => {
        
        var name = reqConditions.makeid(15)
        
        cy
            
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.MSG).type(name)
            .wait(1000)
            .get(locators.CHATWALL.POST).click()
            .wait(1000)
            .get(locators.CHATWALL.TEXTCONTENT).eq(0).should('contain', name)
            .wait(2000)
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadPhoto('testphoto2.jpg')
        cy 
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(2000)
            .get(locators.CHATWALL.IMAGECONTENT).eq(0).scrollIntoView().should('be.visible')
            .wait(2000)
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadVideo('testvideo.mp4')
        cy 
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(4000)
            .get(locators.CHATWALL.VIDEOCONTENT).eq(0).scrollIntoView().should('be.visible')

            var name1 = reqConditions.makeid(10)
            var name2 = reqConditions.makeid(10)
            
        cy
            .wait(2000)
            .get(locators.CHATWALL.PHOTO).click()
    
            cy.uploadPhoto('testphoto2.jpg')
        cy 
            .get(locators.CHATWALL.UPLOADTEXT).type(name1)
            .wait(500)
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(2000)
                //.get(locators.CHATWALL.TEXTCONTENT).eq(0).scrollIntoView().should('contain', name1)
            .get(locators.CHATWALL.IMAGECONTENT).eq(0).scrollIntoView().should('be.visible')
            
            .wait(2000)
            .get(locators.CHATWALL.PHOTO).click()
    
        cy.uploadVideo('testvideo.mp4')
        cy 
            .get(locators.CHATWALL.UPLOADTEXT).type(name2)
            .wait(500)
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(4000)
                   // .get(locators.CHATWALL.TEXTCONTENT).eq(0).scrollIntoView().should('contain', name2)
            .get(locators.CHATWALL.VIDEOCONTENT).eq(0).scrollIntoView().should('be.visible')
             
    })

    it('story making', () => {

        var name1 = reqConditions.makeid(15)
        var name2 = reqConditions.makeid(15)
        

        reqConditions.createNewStory(name1)
        cy.wait(1000)
        reqConditions.createNewStory(name2)
        cy.wait(1000)
       
            
    })

    it('Store making', () => {
      
        cy  
            .get(locators.STORE.PAGE).click()
            

            var name = reqConditions.makeid(15)
        reqConditions.newStoreVideo(name, 1)
        cy.wait(1000)
        cy.get(locators.STORE.MYVIDEOTAB).click()
            .get(locators.STORE.ADD).click()
        
        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto5.jpg')
            
            .get(locators.STORE.NAME).click().type('Auto Vid')
            .get(locators.STORE.PRICE).click().type("1")
            .get(locators.STORE.UPLOAD).click()
            .wait(3000)
            .get(locators.STORE.CONTENTNAME)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')



            var name1 = reqConditions.makeid(15)
            var name2 = reqConditions.makeid(15)
        reqConditions.newStoreFile(name1, 1)
        reqConditions.newStoreFile(name2, 1)
        cy.wait(1000)
           

           

            var name3 = reqConditions.makeid(15)
        reqConditions.newStorePhoto(name3, 1)
        cy.wait(1000)
        cy.get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.ADD).click()
        
        cy.newUploadPhoto('testphoto5.jpg')
        cy.uploadThumbnail('testphoto2.jpg')
            
            .get(locators.STORE.NAME).click().type('Auto Photo 1')
            .get(locators.STORE.PRICE).click().type("1")
            .get(locators.STORE.UPLOADPIC).click()
            .wait(3000)
            .get(locators.STORE.CONTENTNAME)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

              
            
    })


})