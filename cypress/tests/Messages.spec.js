import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    var sender = 'Tamara'
    var sender1 = 'TamaraTest'
    var receiver = 'TamaraUser49'
    var text = 'This is automation test message' 
    var text1 = 'This is first send message and should be last on the list'
    var text2 = 'This is second send message and should be first on the list'  
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


   
    it('Should send message to contact User', () => {
        
        cy.login(sender)
            .wait(2000)

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
                    
    })

    it('Should receive message from contact and send a photo message', () => {
        
        cy.login(receiver)
             .wait(2000)
        
        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '1')
            .get(locators.MESSAGES.NOTIFICATIONSICON).should('include.text' , '1')
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.NOTIFICATIONSLIST).should('include.text' , '1')
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , sender)
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , text)
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).click()
            .get(locators.MESSAGES.TEXTRECEIVER).last().should('include.text' , text)
            .get(locators.MESSAGES.TIMERECEIVER).last().should('be.visible')


            .get(locators.MESSAGES.IMGUPLOAD).click()
            .uploadPhotoToMsg('testphoto2.jpg')
            .get(locators.MESSAGES.UPLOAD).click()
            .wait(500)
            .get(locators.MESSAGES.PHOTOCHECK).should('be.visible')
            .get(locators.MESSAGES.BACKTOMYMESSAGES).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , sender)
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , "")
                    
    })

    it('Should be able to open received photo', () => {
        
        cy.login(sender)
            .wait(2000)

        cy
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , receiver).click()
            .get(locators.MESSAGES.INPUT).type(text1)
            .get(locators.MESSAGES.SEND).click()
            .get(locators.MESSAGES.PHOTORECEIVER).last().click()
                    
    })

    it('Field validation and photo size', () => {
        
        cy.login(sender1)
            .wait(2000)

        var textvalidation =  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffA"
        var textcheck = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

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
            .get(locators.MESSAGES.INPUT).type(textvalidation)
            .get(locators.MESSAGES.SEND).click()
            .get(locators.MESSAGES.TEXTCHECK).should('contain.text', textcheck)
            .get(locators.MESSAGES.INPUT).type(text2)
            .get(locators.MESSAGES.SEND).click()

        cy
            .get(locators.MESSAGES.IMGUPLOAD).click()
            .uploadPhotoToMsg('largephoto.jpg')
            .get(locators.GENERAL.SNACKBAR).should('contain.text', "File size limit of 15MB exceeded.")

                    
    })

    it('Receivers messages order', () => {
        
        cy.login(receiver)
             .wait(2000)
        
        cy
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , sender1)
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , text2)
            .get(locators.MESSAGES.USERNAMEONLIST).eq(1).should('include.text' , sender)
            .get(locators.MESSAGES.LASTMESSAGE).eq(1).should('include.text' , text1)
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).click()
            .wait(1000)
            .get(locators.MESSAGES.BACKTOMYMESSAGES).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(1).click()
            .get(locators.MESSAGES.BACKTOMYMESSAGES).click()
            .wait(1000)
            
                    
    })

    it.only('Send to all message', () => {
        
        cy.login(sender1)
             .wait(2000)

             var shorttext = reqConditions.makeid(49)
             var oktext = reqConditions.makeid(50)
             var oktext1 = reqConditions.makeid(50)
        
        cy
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.SENDTOALL).click()
            .get(locators.MESSAGES.TEXTFILD).type(shorttext)
            .get(locators.MESSAGES.SENDTOALLSEND).should('be.disabled')
            .get(locators.MESSAGES.TEXTFILD).type('a')
            .get(locators.MESSAGES.SENDTOALLSEND).should('be.enabled').click()
            .get(locators.MESSAGES.CANCEL).click()
            .wait(500)
            .get(locators.MESSAGES.SENDTOALLCANCEL).click()
            .wait(500)
            .get(locators.MESSAGES.SENDTOALL).click()
            .get(locators.MESSAGES.TEXTFILD).type(oktext)
            .get(locators.MESSAGES.SENDTOALLSEND).should('be.enabled').click()
            .get(locators.MESSAGES.CONFIRM).click()
            .wait(5000)
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , oktext)


        cy
            .get(locators.MESSAGES.SENDTOALL).click()
            .get(locators.MESSAGES.TEXTFILD).type(oktext1)
            .wait(1000)
            .get(locators.MESSAGES.SENDTOALLSEND).click()
            .get(locators.MESSAGES.CONFIRM).click()
            .get(locators.MESSAGES.ONLY24H).should('be.visible')
            .wait(2000)
            .get(locators.MESSAGES.CANCEL).click()
            .get(locators.MESSAGES.SENDTOALLCANCEL).click()
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , oktext)

            
                    
    })

 


})