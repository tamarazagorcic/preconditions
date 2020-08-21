import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    beforeEach(() => {
        cy.login('TamaraUser49')
            .wait(2000)
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
            .wait(1000)
            .get(locators.CHATWALL.IMAGECONTENT).eq(0).scrollIntoView().should('be.visible')
            .wait(2000)
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadVideo('testvideo.mp4')
        cy 
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(1000)
            .get(locators.CHATWALL.VIDEOCONTENT).eq(0).scrollIntoView().should('be.visible')
             
    })

   
   
    it('Should be able to post an image and video with text to the wall', () => {
        
        var name1 = reqConditions.makeid(10)
        var name2 = reqConditions.makeid(10)
        
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadPhoto('testphoto2.jpg')
        cy 
            .get(locators.CHATWALL.UPLOADTEXT).type(name1)
            .wait(500)
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(1000)
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

    it('Should be able to successfully create new private Video album', () => {
        
        var name = reqConditions.makeid(7)
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PRIVATEALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy    
            .get(locators.VIDEO.NAME).type(name)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(4000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')
        cy
                .get(locators.VIDEO.PUBLICALBUMS).click()
                .get(locators.VIDEO.CREATENEWALBUM).click()
    
            cy.newUploadVideo('testvideo.mp4')
              
            var name1 = reqConditions.makeid(7)
               cy .get(locators.VIDEO.NAME).type(name1)
                .get(locators.VIDEO.UPLOAD).click()
                .wait(4000)
                .get(locators.VIDEO.MEDIAALBUM)
                    .eq(0)
                    .scrollIntoView()
                    .should('be.visible')


        cy          .wait(4000)
                    .get(locators.VIDEO.SPONSOREDALBUMS).click()
                    .get(locators.VIDEO.CREATENEWALBUM).click()
        
                cy.newUploadVideo('testvideo.mp4')
                var name3 = reqConditions.makeid(7)
                cy    
                    .get(locators.VIDEO.NAME).type(name3)
                    .get(locators.VIDEO.UPLOAD).click()
                    .wait(4000)
                    .get(locators.VIDEO.MEDIAALBUM)
                        .eq(0)
                        .scrollIntoView()
                        .should('be.visible')
        
    })

    // it('Should be able to successfully create new public Video album', () => {
    //     cy
    //         .get(locators.VIDEO.PAGE).click()
    //         .get(locators.VIDEO.CREATENEWALBUM).click()

    //     cy.newUploadVideo('testvideo.mp4')
    //      eb
    //     var name = reqConditions.makeid(7)
    //        cy .get(locators.VIDEO.NAME).type(name)
    //         .get(locators.VIDEO.UPLOAD).click()
    //         .wait(4000)
    //         .get(locators.VIDEO.MEDIAALBUM)
    //             .eq(0)
    //             .scrollIntoView()
    //             .should('be.visible')
    // })

    // it('Should be able to successfully create new sponsored Video album', () => {
    //     cy
    //         .get(locators.VIDEO.PAGE).click()
    //         .get(locators.VIDEO.SPONSOREDALBUMS).click()
    //         .get(locators.VIDEO.CREATENEWALBUM).click()

    //     cy.newUploadVideo('testvideo.mp4')
    //     var name = reqConditions.makeid(7)
    //     cy    
    //         .get(locators.VIDEO.NAME).type(name)
    //         .get(locators.VIDEO.UPLOAD).click()
    //         .wait(4000)
    //         .get(locators.VIDEO.MEDIAALBUM)
    //             .eq(0)
    //             .scrollIntoView()
    //             .should('be.visible')
    // })

    it('Should be able to successfully create new private photo album', () => {
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
                .get(locators.PHOTO.PUBLICALBUMS).click()
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

            cy  
                    .wait(1000)
                    .get(locators.PHOTO.SPONSOREDALBUMS).click()
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

        
    })

    // it('Should be able to successfully create new public photo album', () => {
    //     cy
    //         .get(locators.PHOTO.PAGE).click()
    //         .get(locators.PHOTO.CREATENEWALBUM).click()

    //     cy.newUploadPhoto('testphoto2.jpg')
    //     cy.newUploadPhoto('testphoto5.jpg')

    //     var name = reqConditions.makeid(7)
    //     cy    
    //         .get(locators.PHOTO.NAME).type(name)
    //         .get(locators.PHOTO.UPLOAD).click()
    //         .wait(4000)
    //         .get(locators.PHOTO.MEDIAALBUM)
    //             .eq(0)
    //             .scrollIntoView()
    //             .should('be.visible')
    // })

// it('Should be able to successfully create new sponsored photo album', () => {
//         cy  
//             .get(locators.PHOTO.PAGE).click()
//             .get(locators.PHOTO.SPONSOREDALBUMS).click()
//             .get(locators.PHOTO.CREATENEWALBUM).click()

//         cy.newUploadPhoto('testphoto3.jpg')
//         cy.newUploadPhoto('testphoto6.jpg')

//         var name = reqConditions.makeid(7)
//         cy    
//             .get(locators.PHOTO.NAME).type(name)
//             .get(locators.PHOTO.UPLOAD).click()
//             .wait(4000)
//             .get(locators.PHOTO.SPONSOREDALBUMS).click()
//             .get(locators.PHOTO.MEDIAALBUM)
//                 .eq(0)
//                 .scrollIntoView()
//                 .should('be.visible')
//     })

    it('story making', () => {
        var name = reqConditions.makeid(15)
        reqConditions.createPrivateStory(name)
        reqConditions.photoVideoStory(name)
            
    })

    it('Store making', () => {

        var name1 = reqConditions.makeid(15)
        var name = reqConditions.makeid(15)
        var name2 = reqConditions.makeid(15)

        cy  
            .get(locators.STORE.PAGE).click()

            reqConditions.newStoreVideo(name, 1)
            reqConditions.newStoreFile(name1, 1)
            reqConditions.newStorePhoto(name2, 1)
            
    })








})