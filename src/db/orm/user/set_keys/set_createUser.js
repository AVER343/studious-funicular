const pool = require('../../../postgres')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
async function createUser() {
        let existing_user =  await this.find({email:this.email,user_name:this.user_name})
        if(existing_user.length>0)
            {
                if(this.email == existing_user[0].email)
                {
                        throw new Error('User with same Email exists !')
                }
                else
                {
                        throw new Error('User with same Username exists !')
                }
          }
            let new_user = await pool.query(
                `INSERT INTO USERS(user_name , email , password) VALUES($1,$2,$3) RETURNING *;`,
                [this.user_name,this.email,this.password])
                let keys = Object.keys(new_user.rows[0])
                keys.map(e=>{
                        this[e] = new_user.rows[0][e]
                })    
}
module.exports = createUser