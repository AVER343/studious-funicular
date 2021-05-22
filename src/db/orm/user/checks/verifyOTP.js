const pool = require("../../../postgres");
const { NO_USER_FOUND } = require("../error_statements");
async function verifyOTP({email,otp}){
        const user = (await this.findOne({email}))[0]
        if(user.length==0)
        {
            throw new Error(NO_USER_FOUND)
        }
        const  database_otp = await pool.query(`SELECT * FROM USER_OTP
                                                 WHERE user_id= $1 and otp = $2  
                                                 and id = (SELECT MAX(id) FROM USER_OTP WHERE user_id= $1)
                                                 and generated_on > NOW() - INTERVAL '15 minutes '
                                                 and otp_active = true;`,[user.id,otp])
        if(database_otp.rowCount==0){
        await pool.query(`UPDATE USER_OTP 
                SET OTP_TRIED_FOR = OTP_TRIED_FOR + 1
            WHERE user_id = $1 and id = (SELECT MAX(id) FROM USER_OTP 
                                            WHERE user_id= $1);`,[user.id])
        throw new Error('Wrong OTP provided or OTP expired !');
    }
        await pool.query(`UPDATE USER_OTP 
                            SET OTP_ACTIVE = FALSE
                        WHERE id=$1`,[database_otp.rows[0].id])
       await pool.query(`UPDATE USERS 
                            SET email_verified =true , user_active = true
                           WHERE email = $1 and id = $2::integer returning *;`,[email,user.id])
        user['email_verified']= true
        return user
    
}
module.exports = verifyOTP