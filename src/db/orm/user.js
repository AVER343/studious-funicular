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

    async createJWT(){
        let json_web_token = await jwt.sign({...this,jwt_created_time:Date.now()},process.env.JWT_SECRET)
        this.jwt = json_web_token
    }
    async save(){
        let user = await pool.query('SELECT * FROM USERS where email = $1',[this.email])
            if(user.rowCount!=0)
            {
                throw new Error('User with email exists !')
            }
            let new_user = await pool.query(
                `INSERT INTO USERS(user_name , email , password) VALUES($1,$2,$3) RETURNING *`,
                [this.user_name,this.email,this.password])

                let keys = Object.keys(new_user.rows[0])
                keys.map(e=>{
                    this[e] = new_user.rows[0][e]
                })
                this.deleteFields()
                this.createJWT()
    }
    static async generateOTP(email){
        let OTP = Math.ceil(Math.random() * 20000 + Math.random()*10000)
        if(OTP<1000)
        {
            OTP = OTP + 999 + Math.random()*10000
        }
        let user = await pool.query('SELECT * FROM USERS WHERE EMAIL = $1',[email])
        await pool.query('INSERT INTO USER_OTP(user_id,otp) VALUES($1,$2)',[user.rows[0].id,OTP])
        return OTP
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
    static async findOne({email,withFields=false}){
        const user = await pool.query('SELECT * FROM USERS WHERE email = $1',[email]);
        if(user.rowCount==0)
        {
            throw new Error('No user with the provided email exists !')
        }
        let new_user = new User({...user.rows[0]})
        new_user.deleteFields()
        return new_user
    }
    static async verifyLogin(email,password){
        let user = await pool.query('SELECT * FROM USERS WHERE email = $1',[email])
        let isRightPassword = await bcrypt.compare(password,user.rows[0].password)
        if(!isRightPassword)
        {
           throw new Error('Invalid credentials !')
        }
        if(!user.rows[0]['email_verified'])
        {
            throw new Error('Please verify your email !')
        }
        let new_user = new User({...user.rows[0]})
        new_user.deleteFields()
        return new_user
    }
    async deleteFields(){
        delete this.password
        delete this.modified_time
        delete this.user_active
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
                                                WHERE user_id= $1)`,[user.id])
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
                               WHERE email = $1 and id = $2::integer returning *`,[email,user.id])
            user['email_verified']= true
            user.deleteFields()
            user.createJWT()
            return user
        }
        catch(e){
            throw new Error(e.message)
        }
    }
    async changePassword(new_password){
        this.password = bcrypt.hashSync(new_password,parseInt(process.env.HASHING_ITERATIONS))
        await pool.query('UPDATE USERS SET PASSWORD =$1 WHERE id=$2',[this.password,this.id])
    }
}
module.exports = User