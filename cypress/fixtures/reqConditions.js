const users = require('./users.json')
const locators = require('./locators.json')

class ReqCondition {

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    createNewStory(storyName) {
        cy
            .visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)
            
        cy.newUploadPhoto('testphoto3.jpg')

        cy  .get(locators.STORY.POST).click()
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
    }

    createPrivateStory(storyName) {
        cy
            .visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)
            
        cy.newUploadPhoto('testphoto4.jpg')
        cy.newUploadPhoto('testphoto3.jpg')
        cy.newUploadPhoto('testphoto2.jpg')

        cy  .wait(1000)
            .get(locators.STORY.ITEM).eq(0).click()
            .wait(500)
            .get(locators.STORY.POST).click()
            .wait(1500)
            
            if(cy.get(locators.STORY.DIALOG).should('be.visible')){
                cy.get(locators.STORY.DIALOGCANCEL).click()
            }else{
                cy.get(locators.STORY.BOTTOMNOTIFICATION)
                    .should('contain', 'Story has been successfully updated.')
            }
    }

    createPrivateStoryWithLevels(storyName) {
        cy
            .visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)
            
        cy.newUploadPhoto('testphoto4.jpg')
        cy.newUploadPhoto('testphoto3.jpg')
        cy.newUploadPhoto('testphoto2.jpg')

        cy  .wait(1000)
            .get(locators.STORY.ITEM).eq(0).click()
            .wait(500)
            .get(locators.STORY.POST).click()
            .wait(1500)
            cy.get(locators.STORY.BOTTOMNOTIFICATION)
                .should('contain', 'Story has been successfully published.')
            
    }

    createNewVideoStory(storyName) {
        cy
            .visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)
            
        cy.newUploadVideo('testvideo.mp4')

        cy  .wait(2000)
            .get(locators.STORY.POST).click()
            .wait(2000)
            .get(locators.STORY.CLOSEBOTTOMSHEET).should('be.visible').click()
    }

    photoVideoStory(storyName) {
        cy
            .visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)

            cy.newUploadVideo('testvideo.mp4')
            cy.newUploadPhoto('testphoto6.jpg')
        

        cy  
            .get(locators.STORY.POST).click()
            .wait(7000)
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
    }

    newStoreVideo(videoName, videoPrice) {
        cy
            
            .get(locators.STORE.MYVIDEOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadVideo('testvideo.mp4')
        cy
            .get(locators.STORE.NAME).click().type(videoName)
            .get(locators.STORE.PRICE).click().type(videoPrice)
            .get(locators.STORE.UPLOAD).click()
            .wait(1500)
    }

    newStoreFile(fileName, filePrice) {
        cy
            
            .get(locators.STORE.MYFILESTAB).click()
            .get(locators.STORE.ADD).click()
            
        cy.newUploadFile('testfile.pdf')
        cy
            .get(locators.STORE.NAME).type(fileName)
            .wait(1500)
            .get(locators.STORE.PRICE).type(filePrice)
            .wait(1500)
            .get(locators.STORE.UPLOAD).click()
            .wait(4000)
    }

    newStorePhoto(photoName, photoPrice) {
        cy
            
            .get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadPhoto('testphoto5.jpg')
        cy.newUploadPhoto('testphoto4.jpg')
        cy    
            .get(locators.STORE.NAME).type(photoName)
            .get(locators.STORE.PRICE).type(photoPrice)
            .get(locators.STORE.UPLOADPIC).click()
            .wait(1500)
    }

    publicPhotoAlbum(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click() 
            .get(locators.PHOTO.PUBLICALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()
    
        cy.newUploadPhoto('testphoto2.jpg')
        cy.newUploadPhoto('testphoto5.jpg')
     
        cy    
            .get(locators.PHOTO.NAME).type(albumname)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    privatePhotoAlbum(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click()    
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto1.jpg')
        cy.newUploadPhoto('testphoto2.jpg')

        cy    
            .get(locators.PHOTO.NAME).type(albumname)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    sponsoredPhotoAlbum(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click()    
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto3.jpg')
        cy.newUploadPhoto('testphoto6.jpg')

        cy    
            .get(locators.PHOTO.NAME).type(albumname)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(4000)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    publicVideoAlbum(albumname) {
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PUBLICALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy 
            .get(locators.VIDEO.NAME).type(albumname)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(4000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    privateVideoAlbum(albumname) {
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PRIVATEALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy    
            .get(locators.VIDEO.NAME).type(albumname)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(4000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    sponsoredVideoAlbum(albumname) {
        cy        
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
    
        cy    
            .get(locators.VIDEO.NAME).type(albumname)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(4000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    textWallPost(text) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.MSG).type(text)
            .wait(1000)
            .get(locators.CHATWALL.POST).click()
            .wait(1000)
            //.get(locators.CHATWALL.TEXTCONTENT).eq(0).should('contain', name)

    }

    photoWallPost(photo) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadPhoto(photo)
        cy 
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(1000)
           // .get(locators.CHATWALL.IMAGECONTENT).eq(0).scrollIntoView().should('be.visible')

    }

    videoWallPost(video) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadVideo(video)
        cy 
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(4000)
            // .get(locators.CHATWALL.VIDEOCONTENT).eq(0).scrollIntoView().should('be.visible')

    }

    photoTextWallPost(text, photo) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadPhoto(photo)
        cy 
            .get(locators.CHATWALL.UPLOADTEXT).type(text)
            .wait(500)
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(1000)
            //.get(locators.CHATWALL.TEXTCONTENT).eq(0).scrollIntoView().should('contain', name1)
            .get(locators.CHATWALL.IMAGECONTENT).eq(0).scrollIntoView().should('be.visible')

    }

    videoTextWallPost(text, video) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.PHOTO).click()

        cy.uploadVideo(video)
        cy 
            .get(locators.CHATWALL.UPLOADTEXT).type(text)
            .wait(500)
            .get(locators.CHATWALL.UPLOAD).click()
            .wait(4000)
            // .get(locators.CHATWALL.TEXTCONTENT).eq(0).scrollIntoView().should('contain', name2)
            .get(locators.CHATWALL.VIDEOCONTENT).eq(0).scrollIntoView().should('be.visible')

    }


}

export default new ReqCondition()
