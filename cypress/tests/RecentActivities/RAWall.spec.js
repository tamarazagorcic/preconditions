import 'cypress-file-upload'
const locators = require('../../fixtures/locators.json')
const reqConditions = require('../../fixtures/reqConditions.js')





describe('This is a scipt for checking Recent Activity for Wall posts ', () =>{

    let creator = 'Test3'
    let sponsor = 'Test9'
    let text = reqConditions.makeid(77) 
    let comment = reqConditions.makeid(12)
        

    it('Should be able to successfully create new text post', () => {
        cy.login(creator)
            .wait(2000)
               
        reqConditions.textWallPost(text)
               
    })
   
    it('Should see a wall icon created', () => {
        
        cy.login(sponsor)
        .wait(2000)
        .visit("/"+creator)
        .wait(3000)


        //.get(locators.RA.WALL).eq(1).should('be.visible')
        .get(locators.RA.ITEM).eq(0).click()
        .wait(1000)
        .get('h2').should('contain.text', "Wall")
        .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                   
    })

    
    it('Should be able to successfully comment on text post', () => {
        cy.login(creator)
            .wait(2000)
             
        reqConditions.comentOwnWallPost(comment)
               
    })

    it('Comment should not trigger new wall post', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)
            // .get(locators.RA.WALL).eq(1).should('be.visible')
            // .get(locators.RA.WALL).eq(2).should('not.be.visible')
            .get(locators.RA.ITEM).eq(0).click()
          
            
    })

    it('Should be able to successfully create new posts', () => {
        cy.login(creator)
            .wait(2000)
            
        reqConditions.photoWallPost('testphoto3.jpg')    
        cy.wait(2000)
        reqConditions.videoWallPost('testvideo2.mp4')
        cy.wait(2000)
        reqConditions.photoTextWallPost(text, 'testphoto5.jpg')
        cy.wait(2000)
        reqConditions.videoTextWallPost(text, 'testvideo.mp4')
               
    })

    it('Should be able to see all wall posts cards', () => {
        
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            for(var a=0; a<5; a++){
                cy.get(locators.RA.ITEM).eq(a).click()
                .wait(1000)
                .get('h2').should('contain.text', "Wall")
                .get(locators.FRIENDREQUEST.PROFILEUSERNAME).should('contain.text', creator)
                .get(locators.DASHBOARD.PROFILE).click()
            }      
            
    })

    it('Should be able to successfully delete new posts', () => {
        cy.login(creator)
            .wait(2000)
         
            for(var a=0; a<5; a++){
                reqConditions.deleteWallPost()    
                cy.wait(1000)
                    .get(locators.PHOTO.PAGE)
            }               
    })

    it('No wall posts icons should be visible', () => {
        
          
        cy.login(sponsor)
            .wait(2000)
            .visit("/"+creator)
            .wait(3000)
            .get(locators.RA.ITEM).eq(0).click()
            .get('h2').should('not.contain.text', "Wall")
              
    })  

})