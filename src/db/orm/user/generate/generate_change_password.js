const User = require('../index')
const pool = require('../../../postgres')
let bcrypt = require('bcryptjs')
const { NO_USER_FOUND } = require('../error_statements')
async function changePassword({email,password}){
    let user =await this.findOne({email})
    if(user.length==0)
    {
        throw new Error(NO_USER_FOUND)
    }
    password = await bcrypt.hash(password,parseInt(process.env.HASHING_ITERATIONS))
    await pool.query('UPDATE USERS SET PASSWORD =$1 WHERE email=$2;',[password,email])
}
module.exports = changePassword