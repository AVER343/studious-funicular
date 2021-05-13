const pool = require('../postgres')
let bcrypt = require('bcryptjs')

class User{
    async constructor({user_name,email,password}){
        let user = await pool.query('SELECT * FROM USER where email = $1',[email])
        let hashedPassword = await bcrypt.hash(password,hashedPassword)
        await pool.query('INSERT INTO USERS(user_name , email , password) VALUES($1,$2,$3)',[user_name,email,hashedPassword])
    }
}