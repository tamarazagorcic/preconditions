import 'cypress-file-upload'
const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')





describe('This is a scipt for checking Activity Feed for photo albums upload, edit and delete', () =>{

    let creator = 'Test3'
    let sponsor = 'Test9'
    let nonsponsor = 'Test4'
    let name = reqConditions.makeid(7) 
    let name1 = reqConditions.makeid(7)
    let name2 = reqConditions.makeid(7)
   
    it('Should be able to successfully create new public photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.publicPhotoAlbum(name)
               
    })
   
    it('Should see a recent activity public photo album created icon ', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('contain.text', name)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                    
    })

    it('Should be able to successfully create new sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.sponsoredPhotoAlbum(name1)
               
    })
   
    it('Sponsor should see a recent activitie sponsored photo album created icon', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('contain.text', name1)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            
    })

    it('Non sponsor should see a recent activity icon but leads to sponsored tab', () => {
        
        cy.login(nonsponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)

        var locator1 = "albumName-"+name1
            cy.get('[taglimpse='+locator1+"]").first().should('include.text' , name1)    
            
    })

    it('Should be able to successfully create new private photo album', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.privatePhotoAlbum(name2)
               
    })
   
    it('Should not see a private photo album created', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('not.contain.text', name2)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                        
    })

    it('Should be able to successfully add photo to public photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
        
            reqConditions.addPhoto(name, 'testphoto4.jpg')
        cy.wait(2000)
               
    })

    it('Should see a new photo in public album created', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('contain.text', name)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .wait(1000)
            .get(locators.PHOTO.FAVORITE).eq(2).should('be.visible')
            
    })

    it('Should be able to successfully add photo to sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
        
            reqConditions.addPhoto(name1, 'testphoto4.jpg')
        
               
    })

    it('Should see a new photo in sponsored album created', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)


            //.get(locators.RA.WALL).eq(1).should('be.visible')
            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('contain.text', name1)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .wait(1000)
            .get(locators.PHOTO.FAVORITE).eq(2).should('be.visible')
            .get(locators.DASHBOARD.PROFILE).click()
            .get(locators.RA.ITEM).eq(1).click()
            .wait(1000)
            .get('h2').should('contain.text', name)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
            .wait(1000)
            
    })  

    it('Should be able to successfully delete sponsored photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
            .get(locators.PHOTO.SPONSOREDALBUMS).click()
        
            reqConditions.deletePhotoAlbum(name1)
        
               
    })

    it('Should not see a deleted sponsored photo album on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)

            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('not.contain.text', name1)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                        
    })

    it('Should be able to successfully delete public photo album', () => {
        cy.login(creator)
            .wait(2000)
            .get(locators.PHOTO.PAGE).click()
        
            reqConditions.deletePhotoAlbum(name)
        
               
    })

    it('Should not see a deleted public photo album on Feed', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)

            .get(locators.RA.ITEM).eq(0).click()
            .wait(1000)
            .get('h2').should('not.contain.text', name)
            .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                        
    })


    


})