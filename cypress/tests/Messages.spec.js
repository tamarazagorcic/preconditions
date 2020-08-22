import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    var sender = 'Tamara'
    var receiver = 'TamaraUser49'
    var text = 'This is automation test message' 
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

            .get(locators.MESSAGES.IMGUPLOAD).click()
            .uploadPhotoToMsg('testphoto2.jpg')
            .get(locators.MESSAGES.UPLOAD).click()
            .get(locators.MESSAGES.PHOTOCHECK).should('be.visible')
           
                    
    })

 


})