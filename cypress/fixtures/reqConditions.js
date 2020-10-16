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
            //.visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)
            
        cy.newUploadPhoto('testphoto3.jpg')

        cy  .get(locators.STORY.POST).click()
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
    }

    createPrivateStory(storyName) {
        cy
            //.visit('/user/dashboard')
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
            //.visit('/user/dashboard')
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
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
            
    }

    createNewVideoStory(storyName) {
        cy
            //.visit('/user/dashboard')
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
            //.visit('/user/dashboard')
            .get(locators.STORY.ADD).click()
            .get(locators.STORY.NEWSTORYNAME).click().type(storyName)

            cy.newUploadVideo('testvideo.mp4')
            cy.newUploadPhoto('testphoto6.jpg')
        

        cy  
            .get(locators.STORY.POST).click()
            .wait(7000)
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
    }

    updateArchivedStory() {
        cy
            //.visit('/user/dashboard')
            .get(locators.STORY.PAGE).click()
            .wait(2000)
            .get(locators.STORY.EDITSTORYBTN).eq(0).click()

            cy.newUploadPhoto('testphoto6.jpg')
        

        cy  
            .get(locators.STORY.POST).click()
            .wait(7000)
            .get(locators.STORY.CLOSEBOTTOMSHEET).click()
    }

    deleteStory() {
        cy
            //.visit('/user/dashboard')
            
            .get(locators.STORY.DELETESTORYBTN).eq(0).click()
            .get(locators.STORY.CONFIRMDELETESTORYBTN).click()
            .wait(4000)
                        
    }

    newStoreVideo(videoName, videoPrice) {
        cy
            
            .get(locators.STORE.MYVIDEOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadVideo('testvideo.mp4')
        cy
            .get(locators.STORE.NAME).click().type(videoName)
            .wait(1000)
            .get(locators.STORE.PRICE).click().type(videoPrice)
            .wait(1000)
            .get(locators.STORE.UPLOAD).click()
            .wait(3000)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Video successfully uploaded.')
    }

    newStoreVideoWithThumbnail(videoName, videoPrice) {
        cy
            
            .get(locators.STORE.MYVIDEOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto5.jpg')
        cy
            .get(locators.STORE.NAME).click().type(videoName)
            .get(locators.STORE.PRICE).click().type(videoPrice)
            .get(locators.STORE.UPLOAD).click()
            .wait(3000)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Video successfully uploaded.')
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
            .wait(6000)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'File successfully uploaded.')
    }

    newStorePhoto(photoName, photoPrice) {
        cy
            
            .get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadPhoto('testphoto3.jpg')
        cy.newUploadPhoto('testphoto4.jpg')
        cy    
            .get(locators.STORE.NAME).type(photoName)
            .wait(1000)
            .get(locators.STORE.PRICE).type(photoPrice)
            .wait(1000)
            .get(locators.STORE.UPLOADPIC).click()
            .wait(4000)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Photos are successfully uploaded.')
    }

    newStorePhotoWithThumbnail(photoName, photoPrice) {
        cy
            
            .get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.ADD).click()

        cy.newUploadPhoto('testphoto5.jpg')
        cy.uploadThumbnail('testphoto4.jpg')
        cy    
            .get(locators.STORE.NAME).type(photoName)
            .get(locators.STORE.PRICE).type(photoPrice)
            .get(locators.STORE.UPLOADPIC).click()
            .wait(1500)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Photos are successfully uploaded.')
    }

    editStoreVideoName(name, newName){
        cy
            
            .get(locators.STORE.OPTIONS).first().click()
            .get(locators.STORE.EDITVID).first().click()
            .get(locators.STORE.NAME).clear().type(newName)
            .wait(1000)
            .get(locators.STORE.PRICE).clear().type('2')
            .get(locators.STORE.EDITSAVE).click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , newName)
    }

    editStorePhotoName(name, newName){
        cy
            .get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.CONTENT).first().click()
            .get(locators.STORE.EDITALBUM).first().click()
            .get(locators.STORE.NAME).clear().type(newName)
            .wait(1000)
            .get(locators.STORE.PRICE).clear().type('2')
            .get(locators.STORE.EDITSAVE).click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , newName)
    }

    editStoreFileName(name, newName){
        cy
            .get(locators.STORE.MYFILESTAB).click()
            .get(locators.STORE.OPTIONS).first().click()
            .get(locators.STORE.EDITFILE).first().click()
            .get(locators.STORE.NAME).clear().type(newName)
            .wait(1000)
            .get(locators.STORE.PRICE).clear().type('2')
            .get(locators.STORE.EDITSAVE).click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , newName)
    }

    addPhotoToStorePhotoALbum(name){
        cy
            .get(locators.STORE.MYPHOTOTAB).click()
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , name)
            .get(locators.STORE.CONTENT).first().click()
            .get(locators.STORE.ADD).click()
            
            cy.newUploadPhoto('testphoto5.jpg')

            .get(locators.STORE.UPLOADPIC).click()
            .wait(6000)
            
    }

    deleteStoreVideo(name){
        cy
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , name)
            .wait(1000)
            .get(locators.STORE.OPTIONS).first().click()
            .get(locators.STORE.DELETEVID).first().click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('not.include.text' , name)
    }

    deleteStorePhotoAlbum(name){
        cy
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , name)
            .wait(1000)
            .get(locators.STORE.CONTENT).first().click()
            .get(locators.STORE.DELETEALBUM).click()
            .get(locators.STORE.CONFIRMBTN).click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('not.include.text' , name)
    }

    deleteStoreFile(name){
        cy
            .get(locators.STORE.MYFILESTAB).click()
            .get(locators.STORE.CONTENTNAME).first().should('include.text' , name)
            .wait(1000)
            .get(locators.STORE.OPTIONFILE).first().click()
            .get(locators.STORE.DELETEFILE).first().click()
            .wait(6000)
            .get(locators.STORE.CONTENTNAME).first().should('not.include.text' , name)
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
            .wait(6000)
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    publicPhotoAlbumWithThumbnail(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click() 
            .get(locators.PHOTO.PUBLICALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()
    
        cy.newUploadPhoto('testphoto2.jpg')
        cy.uploadThumbnail('testphoto3.jpg')
     
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
            .wait(6000)
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    privatePhotoAlbumWithThumbnail(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click()    
            .get(locators.PHOTO.PRIVATEALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto1.jpg')
        cy.uploadThumbnail('testphoto3.jpg')

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
            .wait(6000)
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    sponsoredPhotoAlbumWithThumbnail(albumname) {
        cy
            .get(locators.PHOTO.PAGE).click()    
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
            .get(locators.PHOTO.CREATENEWALBUM).click()

        cy.newUploadPhoto('testphoto3.jpg')
        cy.uploadThumbnail('testphoto6.jpg')

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

    addPhoto(name, photo){
        var locator = "goToAlbum-"+name
        cy.get('[taglimpse='+locator+"]").click()
            .get(locators.PHOTO.ADD).click()
        cy.newUploadPhoto(photo)
            .get(locators.PHOTO.UPLOAD).click()
            .wait(6000)
    }

    renamePhotoAlbum(name,newName){
        var locator = "goToAlbum-"+name
        cy.get('[taglimpse='+locator+"]").click()
            .get(locators.PHOTO.RENAMEALBUM).click()
            .get(locators.PHOTO.NAME).clear().type(newName)
            .wait(1000)
            .get(locators.PHOTO.CONFIRMRENAME).click()
            .wait(4000)
    }

    deletePhotoAlbum(name){
        var locator = "goToAlbum-"+name
        cy.get('[taglimpse='+locator+"]").click()
            .get(locators.PHOTO.DELETEALBUM).click()
            .wait(1000)
            .get(locators.PHOTO.CONFIRMBTN).click()
            .wait(4000)
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

    publicVideoAlbumWithThumbnail(albumname) {
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PUBLICALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto6.jpg')
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

    privateVideoAlbumWithThumbnail(albumname) {
        cy
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.PRIVATEALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto6.jpg')
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

    sponsoredVideoAlbumWithThumbnail(albumname) {
        cy        
            .get(locators.VIDEO.PAGE).click()
            .get(locators.VIDEO.SPONSOREDALBUMS).click()
            .get(locators.VIDEO.CREATENEWALBUM).click()

        cy.newUploadVideo('testvideo.mp4')
        cy.uploadThumbnail('testphoto6.jpg')
    
        cy    
            .get(locators.VIDEO.NAME).type(albumname)
            .get(locators.VIDEO.UPLOAD).click()
            .wait(4000)
            .get(locators.VIDEO.MEDIAALBUM)
                .eq(0)
                .scrollIntoView()
                .should('be.visible')

    }

    editName(name, newName){
        cy
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name)
            .get(locators.VIDEO.OPTIONS).first().click()
            .get(locators.VIDEO.RENAMEVIDEO).first().click()
            .get(locators.VIDEO.NAME).clear().type(newName)
            .get(locators.VIDEO.CONFIRMRENAME).click()
            .wait(6000)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , newName)
    }

    deleteVideo(name){
        cy
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('include.text' , name)
            .get(locators.VIDEO.OPTIONS).first().click()
            .get(locators.VIDEO.DELETEVIDEO).first().click()
            .wait(6000)
            .get(locators.VIDEO.NAMEVIDEOTAB).first().should('not.include.text' , name)
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

    editWallPost(newText) {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.EDIT).eq(0).click()
            .get(locators.CHATWALL.TYPECOMMENT).eq(0).type(newText)
            .wait(1000)
            .get(locators.CHATWALL.COMMENT).eq(0).click()
            .wait(2000)
            .get(locators.CHATWALL.TEXTCONTENT).eq(0).scrollIntoView().should('contain', newText)
            

    }

    comentOwnWallPost(text){
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.TYPECOMMENT).eq(0).type(text)
            .wait(1000)
            .get(locators.CHATWALL.COMMENT).eq(0).click()
            .wait(2000)
            .get(locators.CHATWALL.COMMENTCONTENT).eq(0).scrollIntoView().should('contain', text)
        
    }

    deleteWallPost() {
        cy
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.DELETEPOST).eq(0).click()
            .wait(2000)          

    }

    sendFriendRequest(to , text, tokens) {
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.SEARCH).click()
            .get(locators.SEARCH.SEARCHINPUT).type(to)
            .get(locators.SEARCH.SEARCHBTN).click()
            .get(locators.SEARCH.ONEUSERFOUND).should('have.attr','href' ,'/'+to ).click()
            .get(locators.FRIENDREQUEST.REQUEST).should('be.visible').click()
            .get(locators.FRIENDREQUEST.REQUESTMESSAGE).type(text)
            .get(locators.FRIENDREQUEST.TOKENSTOSEND).type(tokens)
            .get(locators.FRIENDREQUEST.SENDREQUEST).click()
            .wait(500)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Request was sent')

    }

    sendFriendRequestWithout(to) {
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.SEARCH).click()
            .get(locators.SEARCH.SEARCHINPUT).type(to)
            .get(locators.SEARCH.SEARCHBTN).click()
            .get(locators.SEARCH.ONEUSERFOUND).should('have.attr','href' ,'/'+to ).click()
            .get(locators.FRIENDREQUEST.REQUEST).should('be.visible').click()
            .get(locators.FRIENDREQUEST.SENDREQUEST).click()
            .wait(500)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Request was sent')

    }

    blockUser(who) {
        cy
            .get(locators.CONTACTS.SERARCHINPUT).clear().type(who)
            .wait(500)
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', who)
            .wait(500)
            .get(locators.CONTACTS.BLOCKUSER).first().click()

    }

    unblockUser(who) {
        cy
            .get(locators.CONTACTS.SERARCHINPUT).clear().type(who)
            .wait(500)
            .get(locators.CONTACTS.TABS).contains(' Unblock ').click()
            .wait(500)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'User '+who+' has been unblocked successfully.')
    }

    sendMessage(receiver, text) {
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Users').click()
            .get(locators.CONTACTS.SERARCHINPUT).type(receiver)
            .get(locators.CONTACTS.SERARCHRESULT).click()
            .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', receiver)

        cy
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.BACKTOMYMESSAGES).should('be.visible')
            .get(locators.MESSAGES.INPUT).type(text)
            .get(locators.MESSAGES.SEND).click()
            .get(locators.MESSAGES.TEXTCHECK).should('contain.text', text)
            .get(locators.MESSAGES.TIMECHECK).last().should('be.visible')
            .get(locators.MESSAGES.DATE).last().should('contain.text', 'Today')
    }

    startBroadcast() {
        cy
        
        .get(locators.BROADCAST.PAGE).click()
        .get(locators.BROADCAST.START).click()
        .wait(1000)
        .get(locators.BROADCAST.RECORD).click()
        .wait(5000)
        .get(locators.BROADCAST.ANNOUNCE).click()
        .wait(1500)
        .get(locators.BROADCAST.END).click()
    }

    


}

export default new ReqCondition()
