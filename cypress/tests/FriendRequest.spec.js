import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for testing friend requests ', () =>{

    var sender = 'TamaraUser49'
    var receiver = 'TamaraUser48'
    var receiver1 = 'TamaraUser45'
    var receiver2 = 'TamaraUser41'
    var text = 'This is automation friend request test message' 
    var text1 = 'This is automation friend request with tokens test message'
    
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


   
    it('Should cancel sending friend request and send friend request from user profile', () => {
        
        cy.login(sender)
            .wait(2000)

        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.SEARCH).click()
            .get(locators.SEARCH.SEARCHINPUT).type(receiver1)
            .get(locators.SEARCH.SEARCHBTN).click()
            .get(locators.SEARCH.ONEUSERFOUND).should('have.attr','href' ,'/'+receiver1 ).click()
            .get(locators.FRIENDREQUEST.REQUEST).should('be.visible')
            .get(locators.FRIENDREQUEST.CLOSEREQUESTPOPUP).click()
            .wait(500)
            .get(locators.DASHBOARD.CONNECT).click()
            .get(locators.FRIENDREQUEST.REQUEST).click()
            .get(locators.FRIENDREQUEST.CANCELSENDING).click()
            .get(locators.FRIENDREQUEST.CLOSEREQUESTPOPUP).click()
            .wait(500)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).first().should('contain.text', receiver1)
            .get(locators.DASHBOARD.CONNECT).should('not.have.class' , 'disabled')
        

                    
    })

    it('Should send friend request to User and than cancel from Outgoing list', () => {
        
        cy.login(sender)
            .wait(2000)

        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.SEARCH).click()
            .get(locators.SEARCH.SEARCHINPUT).type(receiver)
            .get(locators.SEARCH.SEARCHBTN).click()
            .get(locators.SEARCH.ONEUSERFOUND).should('have.attr','href' ,'/'+receiver ).click()
            .get(locators.FRIENDREQUEST.REQUEST).should('be.visible').click()
            .get(locators.FRIENDREQUEST.SENDREQUEST).click()
            .wait(500)
        cy.get(locators.GENERAL.SNACKBAR)
            .should('contain', 'Request was sent')
            .get(locators.DASHBOARD.CONNECT).should('have.class' , 'disabled')
        
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Outgoing Requests').click()
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', receiver)
            .get(locators.CONTACTS.OUTGOINGCANCEL).first().click()
            .wait(500)
        cy.get(locators.GENERAL.SNACKBAR)
                .should('contain', 'Connection request to '+receiver+' has been cancelled')
        cy.get('p').contains('You have no requests pending.')

                    
    })

    it('Should be able to Filter Outgoing friend requests', () => {
        
        cy.login(sender)
            .wait(2000)

        reqConditions.sendFriendRequestWithout(receiver)
        reqConditions.sendFriendRequest(receiver1, text, 0)
        reqConditions.sendFriendRequest(receiver2, text1, 1)

        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Outgoing Requests').click()
            .get(locators.CONTACTS.SERARCHINPUT).type(receiver2)
            .get(locators.CONTACTS.SERARCHRESULT).click()
            .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', receiver2)

                    
    })

    it('Should be able to decline request from Incoming tab', () => {
        
        cy.login(receiver)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '1')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '1').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '1')
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender)
            .get(locators.CONTACTS.INCOMINGDECLINE).first().click()
            .wait(500)
        cy.get('p').should('contain','You have no new requests.')

                    
    })

    it('Should be able to view request with message and accept request from popup', () => {
        
        cy.login(receiver1)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '1')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '1').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '1')
            .get(locators.CONTACTS.INCOMINGMESSAGE).first().should('contain.text', text)
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender).click()
            .get(locators.FRIENDREQUEST.ACCEPTREQUEST).click()
            .wait(500)
            .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', sender)
            .get(locators.DASHBOARD.CHATWALL).should('be.visible')
            .get(locators.DASHBOARD.PVTMSG).click()
            .get(locators.MESSAGES.TEXTRECEIVER).should('contain.text', text)

            reqConditions.sendFriendRequest(receiver2, text, 0)
        
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Users').click()
        reqConditions.blockUser(sender)
            cy.get(locators.CONTACTS.TABS).contains('Blocked users').click()
        reqConditions.unblockUser(sender)
                          
    })

    it('Should be able to filter incoming request and accept all request from Incoming tab', () => {
        
        cy.login(receiver2)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '2')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '2').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '2')
            .get(locators.CONTACTS.INCOMINGMESSAGE).first().should('contain.text', text)
            .get(locators.CONTACTS.INCOMINGMESSAGE).last().should('contain.text', text1)
            .get(locators.CONTACTS.TOKENSRECEIVED).last().should('contain.text', '1')

        cy  .get(locators.CONTACTS.SERARCHINPUT).clear().type(sender)
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender)
            .get(locators.CONTACTS.SERARCHINPUT).clear()

            .get(locators.CONTACTS.TABS).contains('Accept All').click()
                    
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Users').click()
        reqConditions.blockUser(sender)
        cy.wait(500)
        reqConditions.blockUser(receiver1)
        cy  .get(locators.CONTACTS.TABS).contains('Blocked users').click()
        reqConditions.unblockUser(sender)
        reqConditions.unblockUser(receiver1)
                           
    })

    
})