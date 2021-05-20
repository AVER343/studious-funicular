const pool = require('../postgres')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const emailVerificationTemplate = require('../../utils/templates/email-verification');
const { query } = require('../postgres');
class User{
    constructor(params){
        let keys = Object.keys(params)
        keys.map(e=>{
            this[e] = params[e]
        })
      this.password = bcrypt.hashSync(params.password,parseInt(process.env.HASHING_ITERATIONS))
    }
    async sendEmailVerificationMail({reset_password = false}){
        const user = this;
        let message = '<h2><b>Verification code :<b></h2>'
        let OTP = await User.generateOTP(user.email)
        let from=process.env.FROM
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
              to: user.email,
              from,
              subject:'Signup Confirmation !',
              text:'Signup Confirmation !',
              html: emailVerificationTemplate({name:user.user_name,message,OTP,reset_password})
          }
        await sgMail.send(msg)
    }
    static async verifyOTP({email,otp}){
        try{
            const user = await User.findOne({email})
            const  database_otp = await pool.query(`SELECT * FROM USER_OTP
                                                     WHERE user_id= $1 and otp = $2  
                                                     and id = (SELECT MAX(id) FROM USER_OTP WHERE user_id= $1)
                                                     and generated_on > NOW() - INTERVAL '15 minutes '
                                                     and otp_active = true;`,[user.id,otp])
            if(database_otp.rowCount==0){
           try{
                    await pool.query(`UPDATE USER_OTP 
                    SET OTP_TRIED_FOR = OTP_TRIED_FOR + 1
                WHERE user_id = $1 and id = (SELECT MAX(id) FROM USER_OTP 
                                                WHERE user_id= $1);`,[user.id])
           }
           catch(e){
            throw new Error('Wrong OTP provided or OTP expired !');
           }
           throw new Error('Wrong OTP provided or OTP expired !');
        }
            await pool.query(`UPDATE USER_OTP 
                                SET OTP_ACTIVE = FALSE
                            WHERE id=$1`,[database_otp.rows[0].id])
           await pool.query(`UPDATE USERS 
                                SET email_verified =true , user_active = true
                               WHERE email = $1 and id = $2::integer returning *;`,[email,user.id])
            user['email_verified']= true
            user.deleteFields()
            user.createJWT()
            return user
        }
        catch(e){
            throw new Error(e.message)
        }
    }

}
module.exports = User