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
        
        reqConditions.privateVideoAlbum(name)
       // public video
                
           // for ( var i = 0; i < 4; i++ ){
        for ( var a =0 ; a< arrayname.length; a++ ) {
            var realname = arrayname[a]
            reqConditions.publicVideoAlbum(realname)

        }
                
           // }
           
        //sponsored video
        cy  .wait(2000)
            
        for ( var i = 0; i < arraynamesponsored.length; i++ ){
            var realnamesponsored = arraynamesponsored[i]
            reqConditions.sponsoredVideoAlbum(realnamesponsored)

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
        var name = reqConditions.makeid(7)
        reqConditions.privatePhotoAlbum(name)

        //public photo
        
        for ( var i = 0; i < arrayname.length; i++ ){
            var realname = arrayname[i]
            reqConditions.publicPhotoAlbum(realname)
        }
            
        //sponsored photo
        cy.wait(1000)
            
        for ( var i = 0; i < arraynamesponsored.length; i++ ){
            var realnamesponsored = arraynamesponsored[i]
            reqConditions.sponsoredPhotoAlbum(realnamesponsored)
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