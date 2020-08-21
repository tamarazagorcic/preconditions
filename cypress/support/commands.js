// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'
const users = require('../fixtures/users.json')
const env = require('../fixtures/env.json')
const locators = require('../fixtures/locators.json')
import bp from '../fixtures/apiBodyParameters'

Cypress.Commands.add('apiLogin', (usr) => {
    let token
    cy.request({
        method : 'POST',
        url : 'https://g-qa-api.glimpse.me/auth',
        body : bp.loginBody(usr),
    }).then((resp) => {
        token = "{\"expirationTime\":" + resp.body.data.expirationTime + "," + "\"jwtToken\":\"" + resp.body.data.jwtToken + "\"}"
        localStorage.setItem('gm.TOKEN', token)

      })
})

Cypress.Commands.add('executeAPI', (bool, method, url, parameters, bodyParam) => {
    cy.wait(1500)
    return cy.window().then(
        window => {
            let btok = JSON.parse(window.localStorage.getItem('gm.TOKEN'))
            let tok = btok.jwtToken
            if (bool) {
                cy.request({
                    method : method,
                    url : env.URL.API + url + parameters,
                    headers: {
                        Authorization : "Bearer " + tok
                        },
                    body : bodyParam
                    }).then((resp) => {
                        let response = resp.body
                        return response
                    })
                }

            })
    // })
})

Cypress.Commands.add('login', (usr) => {

    cy.visit('/auth/login')
    cy
        .get(locators.LOGIN.EMAIL).type(users[usr].email)
        .get(locators.LOGIN.PASSWORD).type(users.password)
        .get(locators.LOGIN.LOGINBTN).click()

})

Cypress.Commands.add('uploadPhoto', (uploadPhotoName) => {
    const fileName = `media/photos/${uploadPhotoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.DROPZONE).upload({ fileContent, fileName, mimeType: 'image/jpeg', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('newUploadPhoto', (uploadPhotoName) => {
    const fileName = `media/photos/${uploadPhotoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.UPLOAD1).eq(0).upload({ fileContent, fileName, mimeType: 'image/jpeg', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('uploadThumbnail', (uploadPhotoName) => {
    const fileName = `media/photos/${uploadPhotoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.UPLOAD1).eq(1).upload({ fileContent, fileName, mimeType: 'image/jpeg', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('uploadVideo', (uploadVideoName) => {
    const fileName = `media/videos/${uploadVideoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.DROPZONE).upload({ fileContent, fileName, mimeType: 'video/mp4', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('newUploadVideo', (uploadVideoName) => {
    const fileName = `media/videos/${uploadVideoName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.UPLOAD1).eq(0).upload({ fileContent, fileName, mimeType: 'video/mp4', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('uploadFile', (uploadFileName) => {
    const fileName = `media/files/${uploadFileName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.DROPZONE).upload({ fileContent, fileName, mimeType: 'application/pdf', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('newUploadFile', (uploadFileName) => {
    const fileName = `media/files/${uploadFileName}`
    cy.fixture(fileName, 'base64').then(fileContent => {
    cy.get(locators.GENERAL.UPLOAD1).eq(0).upload({ fileContent, fileName, mimeType: 'application/pdf', encoding: 'binary' },
    // { subjectType: 'drag-n-drop' }
    )
    })
})

Cypress.Commands.add('randomSixDigitNumber', () => {
        let num = Math.floor(Math.random() * 900000)
        return num
})

Cypress.Commands.add('buyTokens', (planId) => { 
    cy
        .executeAPI(true, "GET", "transactions/purchase-options/"+planId, "" , planId).then(response => {
        let cardId = response.data.cards[0].id
    cy
        .executeAPI(true, "POST", "transactions/purchase-request", "", bp.buyTokens(planId,cardId))
        })
})

Cypress.Commands.add('readTokenBalance', () => {
    return cy.get(locators.TOKENS.TEXT)
            .invoke('text').then(text => {
            let tokenText = text.match(/\d+/g).map(Number);
            let tokenAmount = tokenText[0]
            return tokenAmount 
    })
    
})

Cypress.Commands.add('sendConnect', (usr, msg, gift) => {
    cy.executeAPI(true, "POST", "glimpse/request", "", bp.sendConnect(usr, msg, gift))
})

Cypress.Commands.add('acceptConnect', (usr, msg) => {
    cy.executeAPI(true, "POST", "glimpse/request/accept", "", bp.acceptConnect(usr, msg))

})

Cypress.Commands.add('blockContact', (userName) =>{
    cy.executeAPI(true, "POST", "people/block?userName=", userName, null)
})

Cypress.Commands.add('unblockContact', (userName) =>{
    cy.executeAPI(true, "DELETE", "people/block?userName=", userName, null)
})

Cypress.Commands.add('deleteStory', (userName) =>{
    cy.executeAPI(true, "GET", "story", "?userName="+userName, null)
        .then(response => {
            let storyId = response.data[0].id
            cy.executeAPI(true, "DELETE", "story", "?id=" + storyId, null) 
        })
})

Cypress.Commands.add('deleteStoreVideo', (userName) => {
    cy.executeAPI(true, "GET", "store/video/", userName, null)
        .then(response => {
            let videoId = response.data.items["0"].id
            cy.executeAPI(true, "DELETE", "store/video/", videoId, null) 
        })
})

Cypress.Commands.add('deleteStoreAlbum', (userName) => {
    cy.executeAPI(true, "GET", "store/album/", userName, null)
        .then(response => {
            let albumId = response.data["0"].id
            cy.executeAPI(true, "DELETE", "store/album/", albumId, null) 
        })
})

Cypress.Commands.add('deleteStoreFile', (userName) => {
    cy.executeAPI(true, "GET", "store/file/", userName, null)
        .then(response => {
            let fileId = response.data.items["0"].id
            cy.executeAPI(true, "DELETE", "store/file/", fileId, null) 
        })
})

Cypress.Commands.add('createSponsorship', (levelName, levelPrice, description, levelFeature, levelActive) =>{
    cy.executeAPI(true, "POST", "sponsor/level", "", bp.createLevel(levelName, levelPrice, description, levelFeature, levelActive))
})

Cypress.Commands.add('deleteSponsorship', () => {
    cy.executeAPI(true, "GET", "user/me", "", null)
        .then(response => {
            let levelId = response.data.sponsorshipLevels[0].levelId
            cy.executeAPI(true, "DELETE", "sponsor/level", "?levelId=" + levelId, null)
        })
})

Cypress.Commands.add('deleteAllSponsorships', () => {
    cy.executeAPI(true,"GET", "user/me", "", null)
        .then(response => {
            let levelIDs = response.data.sponsorshipLevels.map(level => level.levelId)
            levelIDs.forEach(lvl => {
                cy.executeAPI(true, "DELETE", "sponsor/level", "?levelId=" + lvl, null)    
            })
        })
})

Cypress.Commands.add('selectSponsorshipFeatures', (feature) => {
    cy.get(locators.SPONSET.FEATUREDROPDOWN).click()
    feature.forEach(f => {
        cy.get("[taglimpse="+f+"]").click()
    })
    cy.get('body').type('{esc}')
})

Cypress.Commands.add('startSponsoring', (userToSponsor, levelToSponsor) => {
    cy.executeAPI(true, "GET", "people/profile", "?userName=" + userToSponsor, null)
        .then(response => {
            let levelNames = response.data.sponsorshipLevels.map(level => level.name)
            let levelIndex = levelNames.indexOf(levelToSponsor)
            let levelId = response.data.sponsorshipLevels[levelIndex].levelId
            cy.executeAPI(true, "POST", "sponsor", "?userName="+userToSponsor+"&levelId="+levelId, null)
        })
})

Cypress.Commands.add('deleteSinglePost', () => {
    cy.executeAPI(true, "GET", "wall/post", "", null)
        .then(response => {
            let postId = response.data[0].id
            cy.executeAPI(true, "DELETE", "wall/post", "?postId=" + postId, null)
        })
})

Cypress.Commands.add('createTextPost', (postText) =>{
    cy.executeAPI(true, "POST", "wall/post", "", bp.createPost(postText))
})

Cypress.Commands.add('commentOnPost', (userName, postComment)=> {
    cy.executeAPI(true, "GET", "wall/post", "?userName="+userName, null)
        .then(response =>{
            let postId = response.data[0].id
            cy.executeAPI(true, "POST", "wall/comment", "?postId="+postId+"&userName="+userName, bp.commentPost(postComment))
        })
})

Cypress.Commands.add('deleteComment', () => {
    cy.executeAPI(true, "GET", "wall/post", "", null)
        .then(response => {
            let postId = response.data[0].id
            let commId = response.data[0].comments[0].commentId
            cy.executeAPI(true, "DELETE", "wall/comment", "?postId=" + postId + "&commentId=" + commId, null)
        })
})

Cypress.Commands.add('updateUserInformation', (firstName, lastName, birthday, gender) => {
    cy.executeAPI(true, "PUT", "user/me", "", bp.updateUserInformation(firstName, lastName, birthday, gender))
})

Cypress.Commands.add('updateAllUserInformation', (firstName, lastName, birthday, gender, aboutMe, tags) => {
    cy.executeAPI(true, "PUT", "user/me", "", bp.updateAllUserInformation(firstName, lastName, birthday, gender, aboutMe, tags))
            
})
