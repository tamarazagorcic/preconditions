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


   
    it('Should be able to successfully create new private, public and sponsored Video album', () => {
        
        // const inviteLink = '',
        // const storeLink = ''
        cy
            .get(locators.HEADER.USERMENU).click()
            .get(locators.PROFILEMENU.INVITELINK).click()
               
        cy.get(locators.LINKS.INVITELINK).eq(1).then(($btn) => {

            const inviteLink = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Invite link', link: inviteLink}, { encoding: 'ascii', flag: 'a+' })
            
        })
        cy
            .get(locators.LINKS.CLOSE).click()
            .get(locators.PROFILEMENU.CLOSEMENU).click()
        cy
            .get(locators.STORE.PAGE).click()
            .get(locators.STORE.SHARINGTAB).click()
            .get(locators.STORE.LINK).click()
        cy
            
            .get(locators.DASHBOARD.CHATWALL).click()
            .get(locators.CHATWALL.MSG).type('{ctrl}v', {force: true})
            .wait(1000)
            .get(locators.CHATWALL.POST).click()
          
        //const storeLink = cy.type('{cmd}v')
        //cy.writeFile('cypress/fixtures/links.json', { name: 'Store link', link: }, { encoding: 'ascii', flag: 'a+' })

        // setTimeout(async () => {
        //     const storeLink = await navigator.clipboard.readText();
        //     console.log(text);
        //     cy.writeFile('cypress/fixtures/links.json', { name: 'Store link', link: storeLink}, { encoding: 'ascii', flag: 'a+' })
        //   }, 2000);
          
        cy.get(locators.CHATWALL.TEXTCONTENT).eq(0).then(($btn) => {

            const storeLink = $btn.text()
            cy.writeFile('cypress/fixtures/links.json', { name: 'Store link', link: storeLink}, { encoding: 'ascii', flag: 'a+' })
            
          })
        


    })

    

})