

const User = require('../index')
const pool = require('../../../postgres')
const { NO_USER_FOUND } = require('../error_statements')
async function generateOTP(email){
    let OTP = 10000
    OTP = Math.random()*20000+OTP
    let user = await this.findOne({email})
    if(user.length==0)
    {
        throw new Error(NO_USER_FOUND)
    }
    OTP = Math.ceil(OTP)
    await pool.query('INSERT INTO USER_OTP(user_id,otp) VALUES($1,$2);',[user[0].id,OTP])
    return OTP
}
module.exports = generateOTP