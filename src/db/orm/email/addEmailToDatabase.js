const pool = require("../../postgres")
const User = require("../user/index")

async function addEmailToDatabase({email,email_type,data}){
    let  inserted_email = await pool.query(`INSERT INTO SEND_EMAIL(email , email_type, data )
                                    VALUES ($1,$2,$3) RETURNING *;
        `,[email,email_type,data])
    inserted_email = inserted_email.rows
}
module.exports= addEmailToDatabase