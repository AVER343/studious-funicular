const pool = require("../../../postgres")
const bcrypt = require('bcryptjs')
const User = require("../index")
async function verifyLogin({email,user_name,password}){
    let user = await this.constructor.find({email,user_name})
    if(user.length==0)
    {
        throw new Error('No user with the provided Email exists !')
    }
    if(user.length>1)
    {
        throw new Error('Invalid Email or Username !')
    }
    let isRightPassword = await bcrypt.compare(password,user[0].password)
    if(!isRightPassword)
    {
       throw new Error('Invalid credentials !')
    }
    if(!user.rows[0]['email_verified'])
    {
        throw new Error('Please verify your email !')
    }
    let new_user = new User({...user.rows[0]})
    return new_user
}
module.exports = verifyLogin