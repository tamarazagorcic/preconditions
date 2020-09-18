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
        var name1 = reqConditions.makeid(7)
        var name2 = reqConditions.makeid(7)
        var name3 = reqConditions.makeid(7)
        var name4 = reqConditions.makeid(7)
        var name5 = reqConditions.makeid(7)

        reqConditions.privateVideoAlbum(name)
        reqConditions.privateVideoAlbumWithThumbnail(name1)

        //public video

        reqConditions.publicVideoAlbum(name2)
        reqConditions.publicVideoAlbumWithThumbnail(name3)
                
        //sponsored video
        
        reqConditions.sponsoredVideoAlbum(name4)
        reqConditions.sponsoredVideoAlbumWithThumbnail(name5)
                    
    })

    it('Should be able to successfully create new private public and sponsored photo album', () => {
        
        
        var name = reqConditions.makeid(7)
        var name1 = reqConditions.makeid(7)
        var name2 = reqConditions.makeid(7)
        var name3 = reqConditions.makeid(7)
        var name4 = reqConditions.makeid(7)
        var name5 = reqConditions.makeid(7)
       
        //private photo

        reqConditions.privatePhotoAlbum(name)
        reqConditions.privatePhotoAlbumWithThumbnail(name1)
                           
        //public photo

        reqConditions.publicPhotoAlbum(name2)
        reqConditions.publicPhotoAlbumWithThumbnail(name3)
     
            
        //sponsored photo
       
        reqConditions.sponsoredPhotoAlbum(name4)
        reqConditions.sponsoredPhotoAlbumWithThumbnail(name5)

                   

     })

     it('Should be able to post a wall post', () => {
        
        var name = reqConditions.makeid(15)
        var name1 = reqConditions.makeid(10)
        var name2 = reqConditions.makeid(10)
        
        reqConditions.textWallPost(name)
        cy.wait(2000)
        reqConditions.photoWallPost('testphoto3.jpg')
        cy.wait(2000)
        reqConditions.videoWallPost('testvideo2.mp4')
        cy.wait(3000)      
        reqConditions.photoTextWallPost(name1, 'testphoto5.jpg')
        cy.wait(2000)
        reqConditions.videoTextWallPost(name2, 'testvideo.mp4')
             
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
      
        var name = reqConditions.makeid(15)
        var name1 = reqConditions.makeid(15)
        var name2 = reqConditions.makeid(15)
        var name3 = reqConditions.makeid(15)
        var name4 = reqConditions.makeid(15)
        var name5 = reqConditions.makeid(15)

        cy  
            .get(locators.STORE.PAGE).click()
            
        reqConditions.newStoreVideo(name, 1)
        cy.wait(1000)
        reqConditions.newStoreVideoWithThumbnail(name1, 1)    
        reqConditions.newStoreFile(name2, 1)
        reqConditions.newStoreFile(name3, 1)
        cy.wait(1000)
        reqConditions.newStorePhoto(name4, 1)
        cy.wait(1000)
        reqConditions.newStorePhotoWithThumbnail(name5, 1)
                   
            
    })


})