const pool = require('../../../postgres')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
async function setJWT(){
    let json_web_token = await jwt.sign({...this,jwt_created_time:Date.now()},process.env.JWT_SECRET)
    this.jwt = json_web_token
}
module.exports = setJWT