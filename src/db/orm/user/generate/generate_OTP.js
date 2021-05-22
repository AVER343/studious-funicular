

const User = require('../index')
const pool = require('../../../postgres')
const { NO_USER_FOUND } = require('../error_statements')
async function generateOTP(email){
    let OTP = Math.ceil(Math.random() * 20000 + Math.random()*10000)
    if(OTP<1000)
    {
        OTP = OTP + 999 + Math.random()*10000
    }
    let user = await this.findOne({email})
    if(user.length==0)
    {
        throw new Error(NO_USER_FOUND)
    }
    await pool.query('INSERT INTO USER_OTP(user_id,otp) VALUES($1,$2);',[user[0].id,OTP])
    return OTP
}
module.exports = generateOTP