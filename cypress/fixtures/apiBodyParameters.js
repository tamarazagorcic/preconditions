const users = require('./users.json')
const locators = require('./locators.json')
const env = require('./env.json')
let body

class BodyAPI {

    loginBody(usr) {
        this.body = {
            email: users[usr].email,
            password: users.password,
            rememberMe: false
        }
        return this.body
    }

    sendConnect(usr, msg, gift){
        this.body = {
            userName: usr,
            message: msg,
            tokens: gift
        }
        return this.body
    }

    acceptConnect(usr, msg){
        this.body = {
            userName: usr,
            message: msg
        }
        return this.body
    }

    createAlbum(albumName, albumPrice){
        this.body = {
            name: albumName,
            price: albumPrice
        }
        return this.body
    }

    buyTokens(idPlan, idCard){
        this.body = {
            planId: idPlan,
            cardId: idCard
        }
        return this.body
    }
    
    createLevel(levelName, levelPrice, description, levelFeature, levelActive){
        this.body = {
            name: levelName,
            amount: levelPrice,
            description: description,
            features: levelFeature,
            active: levelActive
        }
        return this.body
    }

    createPost(postText){
        this.body = {
            text: postText
        }
        return this.body
    }

    commentPost(postComment){
        this.body = {
            comment: postComment
        }
        return this.body
    }

    updateUserInformation(firstName, lastName, birthday, gender){
        this.body = {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            gender: gender
        }
        return this.body
    }

    updateAllUserInformation(firstName, lastName, birthday, gender, aboutMe, tags){
                this.body = {
                    firstName : firstName,
                    lastName : lastName,
                    birthday : birthday,
                    gender : gender,
                    aboutMe : aboutMe,
                    tags : tags
                }
                return this.body
    }
    
}

export default new BodyAPI()
