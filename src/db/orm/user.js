const pool = require('../postgres')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const emailVerificationTemplate = require('../../utils/templates/email-verification')
class User{
    constructor(params){
        let keys = Object.keys(params)
        keys.map(e=>{
            this[e] = params[e]
        })
      this.password = bcrypt.hashSync(params.password,parseInt(process.env.HASHING_ITERATIONS))
    }

    async createJWT(){
        console.log(this)
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
    async sendEmailVerificationMail(){
        const user = this;
        let message = '<h2><b>Verification code :<b></h2>'
        emailVerificationTemplate({name:user.user_name,message})
    }
    static async findOne({email}){
        const user = await pool.query('SELECT * FROM USERS WHERE email = $1',[email]);
        if(user.rowCount==0)
        {
            throw new Error('No user with the provided email exists !')
        }
        return user.rows[0]
    }
    static async verifyLogin(email,password){
        let user = await pool.query('SELECT * FROM USERS WHERE email = $1',[email])
        let isRightPassword = await bcrypt.compare(password,user.rows[0].password)
        if(!isRightPassword)
        {
           throw new Error('Invalid credentials !')
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
}
module.exports = User