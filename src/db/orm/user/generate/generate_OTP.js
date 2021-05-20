

const User = require('../index')
const pool = require('../../../postgres')
async function generateOTP(email){
    let OTP = Math.ceil(Math.random() * 20000 + Math.random()*10000)
    if(OTP<1000)
    {
        OTP = OTP + 999 + Math.random()*10000
    }
    let user = await this.constructor.find({email})
    if(user.length==0)
    {
        throw new Error('No user found with the specified email !')
    }
    await pool.query('INSERT INTO USER_OTP(user_id,otp) VALUES($1,$2);',[user[0].id,OTP])
}
module.exports = generateOTP