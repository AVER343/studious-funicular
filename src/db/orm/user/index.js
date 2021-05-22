const pool = require('../../postgres')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const setJWT = require('./set_keys/set_jwt');
const check_find = require('./checks/find');
const check_find_One = require('./checks/findOne')
const generate_change_password= require('./generate/generate_change_password');
const set_create_user = require('./set_keys/set_createUser');
const generateOTP = require('./generate/generate_OTP');
const createUser = require('./set_keys/set_createUser');
const verifyLogin = require('./checks/verifyLogin');
const verifyOTP  = require('../user/checks/verifyOTP');
const addEmailToDatabase = require('../email/addEmailToDatabase');
class User{
    constructor(params){
        let keys = Object.keys(params)
        keys.map(e=>{
            this[e] = params[e]
        })
        if(this['password'])
        {
            this.password = bcrypt.hashSync(params.password,parseInt(process.env.HASHING_ITERATIONS))
        }
        this.set_this_in_constructor()
    }
    static async generate_static_OTP(email){
        try{
            await this.generateOTP(email)
        }
        catch(e){
            throw new Error(e.message)
        }
    }
    async deleteFields(){
        delete this.password
        delete this.modified_time
        delete this.user_active
    }
    async generate_changePassword(new_password){
        try{
            await generate_change_password({email:this.email,password:new_password})
        }
        catch(e){
            throw new Error(e.message)
        }
    }
    set_this_in_constructor(){
        this.find = check_find
        this.findOne = check_find_One
        this.createUser = createUser
        this.generate_change_password =generate_change_password
        this.generateOTP = generateOTP
        this.setJWT = setJWT
        this.verifyLogin = verifyLogin
        this.verifyOTP = verifyOTP
        this.addEmailToDatabase = addEmailToDatabase
    }
}
module.exports = User