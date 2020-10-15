import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    var receiver = 'Tamara'
    var sender1 = 'TamaraTest'
    var sender = 'TamaraUser49'
    var text = 'You shared private album with '+ receiver 
    var text1 = 'This is first send message and should be last on the list'
    var text2 = 'This is second send message and should be first on the list'  
  
    it.only('Private album system message', () => {
        
        cy.login(sender)
            .wait(2000)

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
            .get(locators.VIDEO.GOTOALBUM.concat('',name)).click()
            .get(locators.VIDEO.SENDALBUM).click()
            .get(locators.VIDEO.SEND).first().click()
            .get(locators.VIDEO.CONFIRMBTN).click()
            .wait(1000)
        cy
            .get(locators.MESSAGES.PAGE).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , receiver).click()
            .get(locators.MESSAGES.TEXTCHECK).should('contain.text', text)




    })

   
    it('Should send message to contact User', () => {



        cy
        .get(locators.HEADER.HAMMENU).click()
        .get(locators.HAMBURGERMENU.CONTACTS).click()
        .get(locators.CONTACTS.TABS).contains('Users').click()
        .get(locators.CONTACTS.SERARCHINPUT).type(receiver)
        .get(locators.CONTACTS.SERARCHRESULT).click()
        .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', receiver)
        
    cy
        .get(locators.DASHBOARD.TOKENS).click()
        .get(locators.DASHBOARD.AMOUNTPROFILEPOPUP).type(1)
        .get(locators.DASHBOARD.SEND).click()

    cy
        .get(locators.MESSAGES.PAGE).click()
        .get(locators.MESSAGES.BACKTOMYMESSAGES).should('be.visible')
        .get(locators.MESSAGES.INPUT).type(text)
        .get(locators.MESSAGES.SEND).click()
        .get(locators.MESSAGES.TEXTCHECK).should('contain.text', text)
        .get(locators.MESSAGES.TIMECHECK).last().should('be.visible')
        .get(locators.MESSAGES.DATE).last().should('contain.text', 'Today')
        
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

          
   

 


})