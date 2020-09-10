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
        
        var realname = ""
        var realnamesponsored = ""
        var name1 = "fav album+cont1 " + reqConditions.makeid(3)
        var name2 = "fav album1 " + reqConditions.makeid(3)
        var name3 = "fav album+cont2 " + reqConditions.makeid(3)
        var name4 = "fav cont1 " + reqConditions.makeid(3)
        var name5 = "fav album+cont4 " + reqConditions.makeid(3)
        var name6 = "fav album2 " + reqConditions.makeid(3)
        var name7 = "fav album+cont3 " + reqConditions.makeid(3)
        var name8 = "fav cont2 " + reqConditions.makeid(3)

        var arrayname = [name1, name2, name3, name4];
        var arraynamesponsored = [name5, name6, name7, name8];
        
        
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
       // public video
        cy
        
            .get(locators.VIDEO.PUBLICALBUMS).click()
            
           // for ( var i = 0; i < 4; i++ ){
                for ( var a =0 ; a< arrayname.length; a++ ) {
                    var realname = arrayname[a]

                
                    cy.wait(2000)
                    .get(locators.VIDEO.CREATENEWALBUM).click()
    
                    cy.newUploadVideo('testvideo.mp4')
                    cy.newUploadVideo('testvideo2.mp4')
                    cy .get(locators.VIDEO.NAME).type(realname)
                        .wait(500)
                        .get(locators.VIDEO.UPLOAD).click()
                        .wait(8000)
                        .get(locators.VIDEO.MEDIAALBUM)
                            .eq(0)
                            .scrollIntoView()
                            .should('be.visible')

                }
                
           // }
           
        //sponsored video
        cy  .wait(4000)
            .get(locators.VIDEO.SPONSOREDALBUMS).click()

            for ( var i = 0; i < arraynamesponsored.length; i++ ){
                var realnamesponsored = arraynamesponsored[i]
                    
                cy.wait(2000)
                    .get(locators.VIDEO.CREATENEWALBUM).click()
        
                cy.newUploadVideo('testvideo.mp4')
                cy.newUploadVideo('testvideo2.mp4')
                
                var name3 = reqConditions.makeid(7)
                
                cy.get(locators.VIDEO.NAME).type(realnamesponsored)
                    .get(locators.VIDEO.UPLOAD).click()
                    .wait(8000)
                    .get(locators.VIDEO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')

                    }
                    
    })

    it('Should be able to successfully create new private public and sponsored photo album', () => {
        var realname = ""
        var realnamesponsored = ""
        var name1 = "fav album+cont1 " + reqConditions.makeid(3)
        var name2 = "fav album1 " + reqConditions.makeid(3)
        var name3 = "fav album+cont2 " + reqConditions.makeid(3)
        var name4 = "fav cont1 " + reqConditions.makeid(3)
        var name5 = "fav album+cont4 " + reqConditions.makeid(3)
        var name6 = "fav album2 " + reqConditions.makeid(3)
        var name7 = "fav album+cont3 " + reqConditions.makeid(3)
        var name8 = "fav cont2 " + reqConditions.makeid(3)

        var arrayname = [name1, name2, name3, name4];
        var arraynamesponsored = [name5, name6, name7, name8];
        
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
            for ( var i = 0; i < arrayname.length; i++ ){
                 var realname = arrayname[i]

                cy.wait(1000)
                    .get(locators.PHOTO.CREATENEWALBUM).click()
    
                cy.newUploadPhoto('testphoto2.jpg')
                cy.newUploadPhoto('testphoto5.jpg')
        
                var name = reqConditions.makeid(7)
                cy    
                    .get(locators.PHOTO.NAME).type(realname)
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
            for ( var i = 0; i < arraynamesponsored.length; i++ ){
                var realnamesponsored = arraynamesponsored[i]
                cy.wait(1000)
                    .get(locators.PHOTO.CREATENEWALBUM).click()
        
                cy.newUploadPhoto('testphoto3.jpg')
                cy.newUploadPhoto('testphoto6.jpg')
        
                var name = reqConditions.makeid(7)
                cy 
                    .get(locators.PHOTO.NAME).type(realnamesponsored)
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

        var name1 = "WithSponsoredPart " + reqConditions.makeid(4)
        var name2 = "NoSponsoredPart " + reqConditions.makeid(4)
        var name3 = "WithSponsoredPart " + reqConditions.makeid(4)
        var name4 = "NoSponsoredPart " + reqConditions.makeid(4)

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

        var videoname = ""
        var photoname = ""
        var filename = ""
        var name1 = "purchasedVideo " + reqConditions.makeid(3)
        var name2 = "notPurchasedVideo " + reqConditions.makeid(3)

        var name3 = "notPurchased " + reqConditions.makeid(3)
        var name4 = "purch+Alb+cont " + reqConditions.makeid(3)
        var name5 = "purch+Alb+cont2 " + reqConditions.makeid(3)
        var name6 = "purch+Alb " + reqConditions.makeid(3)
        var name7 = "purch+cont " + reqConditions.makeid(3)

        var name8 = "purchasedFile " + reqConditions.makeid(3)
        var name9 = "notPurchasedFile " + reqConditions.makeid(3)

        var videoarr = [name1, name2];
        var photoarr = [name3, name4, name5, name6, name7];
        var filearr = [name8, name9];
      
        cy  
            .get(locators.STORE.PAGE).click()
            for ( var i = 0; i < videoarr.length; i++ ){
                videoname = videoarr[i]
                
                reqConditions.newStoreVideo(videoname, 1)
                cy.wait(1000)
            }

            for ( var i = 0; i < filearr.length; i++ ){
                filename = filearr[i]
                reqConditions.newStoreFile(filename, 1)
                cy.wait(1000)
            }

            for ( var i = 0; i < photoarr.length; i++ ){
                photoname = photoarr[i]
                
                reqConditions.newStorePhoto(photoname, 1)
                cy.wait(1000)
            }    
            
    })


})