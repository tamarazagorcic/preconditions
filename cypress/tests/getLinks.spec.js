import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
const reqConditions = require('../fixtures/reqConditions.js')
//import bp from '../fixtures/apiBodyParameters.js'




describe('This is a scipt for uploading media to one user', () =>{

    beforeEach(() => {
        cy.login('Tamara')
            .wait(2000)
    })


   
    it('Should be able to successfully get links out of user profile', () => {
        
        //Subaccount link and Invite
        cy
            .get(locators.HEADER.USERMENU).click()
            .get(locators.PROFILEMENU.INVITELINK).click()
        
        cy.get(locators.LINKS.LINKFIELD).eq(0).then(($btn) => {

            const subacc = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Subaccount', link: subacc}, { encoding: 'ascii', flag: 'a+' })
                
        })

        cy.get(locators.LINKS.LINKFIELD).eq(1).then(($btn) => {

            const inviteLink = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Invite link', link: inviteLink}, { encoding: 'ascii', flag: 'a+' })
            
        })
        cy.get(locators.LINKS.CLOSE).click()

        //Affiliate Link
        cy.get(locators.PROFILEMENU.AFFILIATE).click()
        cy.get(locators.LINKS.AFFILIATELINK).then(($btn) => {

            const affiliateLink = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Affiliate Link', link: affiliateLink}, { encoding: 'ascii', flag: 'a+' })
            
        })

        cy.get(locators.HEADER.HAMMENU).click()
        cy.get(locators.HAMBURGERMENU.DASHBOARD).click()

        //Store Link
        cy
            .get(locators.STORE.PAGE).click()
            .get(locators.STORE.SHARINGTAB).click()
            .wait(3000)
                          
        cy.get(locators.STORE.DIRECTLINK).then(($btn) => {

            const storeLink = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Store link', link: storeLink}, { encoding: 'ascii', flag: 'a+' })
            
          })
        //Stories Links
          reqConditions.createPrivateStoryWithLevels('ATtestStory')

        cy
            .get(locators.STORY.PAGE).click()
            .get(locators.STORY.TAB).contains('Active Stories').click()
            .scrollIntoView()
            .get(locators.LINKS.ACTIVESTORYLINK).eq(0).click()
            .wait(2000)

        cy.get(locators.LINKS.LINKFIELD).click().then(($btn) => {

                const activestory = $btn.text()
                cy.writeFile('cypress/fixtures/links.json', { name: 'Active Story Link', link: activestory}, { encoding: 'ascii', flag: 'a+' })
                
            })
        cy.get(locators.LINKS.CLOSE).click()

        cy
            .wait(1000)
            .get(locators.STORY.TAB).contains('Archived Stories').click()
            .scrollIntoView()
            .get(locators.LINKS.ACTIVESTORYLINK).eq(0).click()
            .wait(2000)

        cy.get(locators.LINKS.LINKFIELD).click().then(($btn) => {

                const archivedstory = $btn.text()
                cy.writeFile('cypress/fixtures/links.json', { name: 'Archived Story Link', link: archivedstory}, { encoding: 'ascii', flag: 'a+' })
                
            })
        


    })

    

})