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
}

export default new ReqCondition()
