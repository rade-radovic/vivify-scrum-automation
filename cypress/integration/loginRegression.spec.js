
import userApi from '../api/user'
import color from '../support/console_color'

describe('api testing', () => {
    let userToken;
    before(() => {
        userApi.login({}).then((token) => {
            userToken = token
        })
    })

    it('first', () => {
        userApi.login({testMessage : "login before test"}).then((token) => {
            color.log(token)
        })
    })

    it('wrong email without @', () => {
        // console.log(userToken)
        userApi.login({email : "peramial.com", statusCode : 401, testMessage : "wrong email without @"}).then((token) => {
        })
    })

    it('wrong email without com', () => {
        // console.log(userToken)
        userApi.login({email : "peramial@sada", statusCode : 401, testMessage : "wrong email without @"}).then((token) => {
        })
    })

    it('wrong password', () => {
        // console.log(userToken)
        userApi.login({password : "perasprasa", statusCode : 401, testMessage : "wrong email without @"}).then((token) => { 
        })
    })
})