const User = require('../index')
const pool = require('../../../postgres')
let bcrypt = require('bcryptjs')
async function changePassword({email,password}){
    let user =await this.constructor.findOne({email})
    console.log(user)
    if(user.length==0)
    {
        throw new Error('No user with email found !')
    }
    password = await bcrypt.hash(password,parseInt(process.env.HASHING_ITERATIONS))
    await pool.query('UPDATE USERS SET PASSWORD =$1 WHERE email=$2;',[password,email])
}
module.exports = changePassword