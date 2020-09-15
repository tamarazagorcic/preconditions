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
    var message = 'This is message for check'
    var responsToFR = 'This is response for friend request'
    
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
            .wait(500)
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
            cy.wait(500)
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
        cy.wait(500)
        reqConditions.unblockUser(sender)
        cy.wait(500)
        reqConditions.unblockUser(receiver1)
                           
    })

    it('Should be able to send friend requests', () => {
        
        cy.login(sender)
            .wait(2000)

        reqConditions.sendFriendRequestWithout(receiver)
        reqConditions.sendFriendRequest(receiver1, text1, 1)
                  
    })

    it('Should be able to view request and block request from popup', () => {
        
        cy.login(receiver)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '1')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '1').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '1')
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender).click()
            .get(locators.FRIENDREQUEST.BLOCKREQUEST).click()
            .get(locators.FRIENDREQUEST.UNBLOCKREQUEST).click()
            .wait(500)
            .get(locators.FRIENDREQUEST.REQUEST).should('be.visible')
            .get(locators.FRIENDREQUEST.CLOSEREQUESTPOPUP).click()
            .wait(500)
            .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', sender)
            .get(locators.DASHBOARD.CHATWALL).should('not.be.visible')
            
                          
    })

    it('Should be able to view request with tokens and decline request from popup', () => {
        
        cy.login(receiver1)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '1')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '1').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '1')
            .get(locators.CONTACTS.INCOMINGMESSAGE).first().should('contain.text', text1)
            .get(locators.CONTACTS.TOKENSRECEIVED).last().should('contain.text', '1')
            .get(locators.CONTACTS.SERARCHRESULT).first().should('contain.text', sender).click()
            .get(locators.FRIENDREQUEST.DECLINEREQUEST).click()
            .wait(500)
            .get(locators.CONTACTS.CONTACTSPROFILE).should('contain.text', sender)
            .get(locators.DASHBOARD.CHATWALL).should('not.be.visible')
                                
    })

    it('Preparing for last check', () => {
        
        cy.login(sender)
            .wait(2000)

        reqConditions.sendFriendRequest(receiver1, text1, 1)
        cy
            .get(locators.HEADER.USERMENU).click()
            .get(locators.LOGIN.LOGOUT).click()
        
        cy.login('Tamara')
            .wait(2000)
        
        reqConditions.sendMessage(receiver1, message)
        
        cy
            .get(locators.HEADER.USERMENU).click()
            .get(locators.LOGIN.LOGOUT).click()
    })

    it('Should be able to check nottifications for requests and messges and respond to request with tokens', () => {
        
        cy.login(receiver1)
            .wait(2000)

        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '2')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).should('include.text' , '1').click()
            .get(locators.CONTACTS.TABS).contains('Incoming Requests').click()
            .get(locators.CONTACTS.INCOMINGNOTIFICATION).should('include.text' , '1')
            .get(locators.CONTACTS.INCOMINGMESSAGE).first().should('contain.text', text1)
            .get(locators.CONTACTS.TOKENSRECEIVED).last().should('contain.text', '1')

        cy  .get(locators.CONTACTS.INCOMINGACCEPT).click()
            .get(locators.FRIENDREQUEST.POPUPUSERNAME).should('contain.text', sender)
            .get(locators.FRIENDREQUEST.POPUPTEXT).should('contain.text', text1)
            .get(locators.FRIENDREQUEST.ACCEPTMESSAGE).clear().type(responsToFR)
            .get(locators.FRIENDREQUEST.ACCEPTREQUEST).click()
            .wait(1000)
        cy
            .get(locators.MESSAGES.NOTIFICATIONSHAM).should('include.text' , '2')
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.MESSAGES).should('include.text' , '2').click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).should('include.text' , sender)
            .get(locators.MESSAGES.LASTMESSAGE).eq(0).should('include.text' , responsToFR)
            .get(locators.MESSAGES.USERNAMEONLIST).eq(1).should('include.text' , 'Tamara')
            .get(locators.MESSAGES.LASTMESSAGE).eq(1).should('include.text' , message)
            .get(locators.MESSAGES.USERNAMEONLIST).eq(0).click()
            .get(locators.MESSAGES.TEXTRECEIVER).last().should('include.text' , text1)
            .wait(1000)
            .get(locators.MESSAGES.BACKTOMYMESSAGES).click()
            .get(locators.MESSAGES.USERNAMEONLIST).eq(1).click()
            .get(locators.MESSAGES.BACKTOMYMESSAGES).click()
            .wait(1000)

           
                    
        cy
            .get(locators.HEADER.HAMMENU).click()
            .get(locators.HAMBURGERMENU.CONTACTS).click()
            .get(locators.CONTACTS.TABS).contains('Users').click()
        reqConditions.blockUser(sender)
        cy.wait(500)
        cy.get(locators.CONTACTS.TABS).contains('Blocked users').click()
        cy.wait(1000)
        reqConditions.unblockUser(sender)
        
        
                           
    })

    
})