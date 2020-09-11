import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    beforeEach(() => {
        cy.login('NemanjaProd')
            .wait(2000)
    })


    it('Should be able to post a wall post', () => {
        var name = reqConditions.makeid(15)
        
        reqConditions.textWallPost(name)
        cy.wait(2000)
        reqConditions.photoWallPost('testphoto3.jpg')
        cy.wait(2000)
        reqConditions.videoWallPost('testvideo2.mp4')  
             
    })
 
    it('Should be able to post an image and video with text to the wall', () => {
        var name1 = reqConditions.makeid(10)
        var name2 = reqConditions.makeid(10)
        
        reqConditions.photoTextWallPost(name1, 'testphoto2.jpg')
        cy.wait(2000)
        reqConditions.videoTextWallPost(name2, 'testvideo.mp4')

    })

    it('Should be able to successfully create Video albums', () => {
          var name = reqConditions.makeid(7)
          var name1 = reqConditions.makeid(7)
          var name2 = reqConditions.makeid(7)
          var name3 = reqConditions.makeid(7)
          var name4 = reqConditions.makeid(7)
          var name5 = reqConditions.makeid(7)
  
          //private video

          reqConditions.privateVideoAlbum(name)
          reqConditions.privateVideoAlbumWithThumbnail(name1)
  
          //public video
  
          reqConditions.publicVideoAlbum(name2)
          reqConditions.publicVideoAlbumWithThumbnail(name3)
                  
          //sponsored video
          
          reqConditions.sponsoredVideoAlbum(name4)
          reqConditions.sponsoredVideoAlbumWithThumbnail(name5)
    })

   
    it('Should be able to successfully create photo albums', () => {
        var name = reqConditions.makeid(7)
        var name1 = reqConditions.makeid(7)
        var name2 = reqConditions.makeid(7)
        var name3 = reqConditions.makeid(7)
        var name4 = reqConditions.makeid(7)
        var name5 = reqConditions.makeid(7)
       
        //private photo

        reqConditions.privatePhotoAlbum(name)
        reqConditions.privatePhotoAlbumwithThumbnail(name1)
                           
        //public photo

        reqConditions.publicPhotoAlbum(name2)
        reqConditions.publicPhotoAlbumWithThumbnail(name3)
     
            
        //sponsored photo
       
        reqConditions.sponsoredPhotoAlbum(name4)
        reqConditions.sponsoredPhotoAlbumWithThumbnail(name5)        
    })


    it('story making', () => {
        var name = reqConditions.makeid(15)
        reqConditions.createPrivateStoryWithLevels(name)
        reqConditions.photoVideoStory(name)
            
    })

    it('Store making', () => {
        var name1 = reqConditions.makeid(15)
        var name = reqConditions.makeid(15)
        var name2 = reqConditions.makeid(15)
        var name3 = reqConditions.makeid(7)
        var name4 = reqConditions.makeid(7)

        cy  
            .get(locators.STORE.PAGE).click()

            reqConditions.newStoreVideo(name, 1)
            reqConditions.newStoreFile(name1, 1)
            reqConditions.newStorePhoto(name2, 1)
            reqConditions.newStoreVideoWithThumbnail(name3, 1)
            reqConditions.newStorePhotoWithThumbnail(name4, 1)  
            
    })








})