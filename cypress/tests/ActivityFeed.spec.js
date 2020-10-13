import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    var creator = 'Tamara'
    var sponsor = 'TamaraTest'
    var name = reqConditions.makeid(7) 
    var name1 = reqConditions.makeid(7)
    // beforeEach(() => {
    //     cy.login('Tamara')
    //         .wait(2000)
    // })


    it('Should be able to successfully create new public photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.publicPhotoAlbum(name)
               
    })
   
    it('Should see a public photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name, { matchCase: false })
            
    })

    it('Should be able to successfully create new sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.sponsoredPhotoAlbum(name1)
               
    })
   
    it('Should see a sponsored photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)

        var locator = "userName-"+creator
        cy.get('[taglimpse='+locator+"]").first().should('include.text' , creator)
            .get(locators.FEED.CARDTEXT).first().should('include.text' , ' Added new content to photo album ' + name1 +' ')
            .wait(2000)
            .get(locators.FEED.CARD).first().click()
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .get('h2').contains(name1, { matchCase: false })
            
    })

    


})