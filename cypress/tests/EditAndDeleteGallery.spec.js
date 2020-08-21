// const locators = require('../fixtures/locators.json')

// describe('This test checks if login feature works as expected', () => {

 
//     beforeEach(() => {
//         cy 
//             .visit('')
//             .get(locators.LOGIN.email).type("tamara.bjelobrk@gmail.com")
//             .get(locators.LOGIN.password).type("Ja15021988")
//             .get(locators.LOGIN.submitBtn).click()
//     })

// it('Should sucessfully edit My gallery', () => {
//     cy 
//         .get('a[href*="my-galleries"]').click()
//         .get(locators.CREATENEW.created).contains('New Gallery multiple images/01').click()
//         .get('a.btn').click()
//         .get(locators.CREATENEW.title).clear().type("Edited Gallery")
//         .get(locators.CREATENEW.description).clear()
//         .get('form').contains('form', 'Submit').submit()
//        // .get('a[href*="my-galleries"]').click()
//         .get(locators.CREATENEW.titleEdit).should('contain','Edited Gallery')
     
  
//  })

//  it('Should sucessfully delete My gallery', () => {
//     cy 
//         .get('a[href*="my-galleries"]').click()
//         .get(locators.CREATENEW.created).contains('New Gallery Submit').click()
//         .get('a.btn').should('be.visible')
//         .get(locators.CREATENEW.deleteGallery).eq(0).click()
       
     
  
//  })




//     after(() => {
//         cy.clearLocalStorage()
//     })
// })
