// const locators = require('../fixtures/locators.json')

// describe('This test checks if login feature works as expected', () => {

   
//     beforeEach(() => {
//         cy 
//             .visit('')
//             .get(locators.LOGIN.email).type("tamara.bjelobrk@gmail.com")
//             .get(locators.LOGIN.password).type("Ja15021988")
//             .get(locators.LOGIN.submitBtn).click()
//     })



// //it('Should sucessfully cancel creating new gallery', () => {
// //    cy 
// //        .get('.mr-auto > :nth-child(3) > .nav-link').click()
// //        .get(locators.CREATENEW.title).type("New Gallery Cancel31")
// //        .get(locators.CREATENEW.description).type("my description")
// //        .get(locators.CREATENEW.url).eq(2).type('https://image.shutterstock.com/image-vector/sun-icon-600w-411668686.jpg')
//         //.get('form').contains('form', 'Cancel').click()
// //        .get('form > :nth-child(5)').click()
// //        .get(locators.CREATENEW.created).eq(0).should('contain','New Gallery Cancel31')
// // })

// it('Should sucessfully create new gallery', () => {
//     cy 
//         .get('.mr-auto > :nth-child(3) > .nav-link').click()
//         .get(locators.CREATENEW.title).type("New Gallery Submit")
//         .get(locators.CREATENEW.description).type("my description")
//         .get(locators.CREATENEW.url).eq(2).type('https://image.shutterstock.com/image-vector/sun-icon-600w-411668686.jpg')
//         .get('form').contains('form', 'Submit').submit()
//         .get(locators.CREATENEW.created).eq(0).should('contain','New Gallery Submit')
     
  
//  })

//  it('Wrong format of image', () => {
//     cy 
//         .get('.mr-auto > :nth-child(3) > .nav-link').click()
//         .get(locators.CREATENEW.title).type("New Gallery Submit")
//         .get(locators.CREATENEW.description).type("my description")
//         .get(locators.CREATENEW.url).eq(2).type('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')
//         .get('form').contains('form', 'Submit').submit()
//         .get(locators.CREATENEW.alert)
//                 .contains('Wrong format of image')
//                 .should('be.visible')
     
  
//  })

//  it('Should sucessfully delete image', () => {
//     cy 
//         .get('.mr-auto > :nth-child(3) > .nav-link').click()
//         .get(locators.CREATENEW.title).type("New Gallery multiple images/01")
//         .get(locators.CREATENEW.description).type("my description")
//         .get(locators.CREATENEW.url).eq(2).type('https://image.shutterstock.com/image-vector/sun-icon-600w-411668686.jpg')
//         .get('button[type=button]').contains('Add image').click()
//         .get(locators.CREATENEW.deleteImg).eq(0).click()
//         .get(locators.CREATENEW.url).eq(3).should('not.be.visible')
     
  
//  })

//  it('Should sucessfully create new gallery with 2 images', () => {
//     cy 
//         .get('.mr-auto > :nth-child(3) > .nav-link').click()
//         .get(locators.CREATENEW.title).type("New Gallery multiple images/01")
//         .get(locators.CREATENEW.description).type("my description")
//         .get(locators.CREATENEW.url).eq(2).type('https://image.shutterstock.com/image-vector/sun-icon-600w-411668686.jpg')
//         //.get('form').contains('form', 'Add image').click()
//         .get('button[type=button]').contains('Add image').click()
//         .get(locators.CREATENEW.url).eq(3).type('https://wallpaperstock.net/australia-nature%2C-waterfall%2C-forest_wallpapers_56400_1920x1080.jpg')
//         .get('form').contains('form', 'Submit').submit()
//         .get(locators.CREATENEW.created).eq(0).should('contain','New Gallery multiple images/01')
     
  
//  })


//     after(() => {
//         //cy.clearLocalStorage()
//     })
// })
