const pool = require('../../db/postgres');
const {sendEmailVerificationMail,sendAccountVerificationMail} = require('../../db/orm/user/generate/generate_email')
const sendCronEmail =async()=>{
  let funcs = [sendEmailVerificationMail,sendAccountVerificationMail]
  try{
    let emails =  await pool.query(`SELECT SE.* FROM SEND_EMAIL SE
        JOIN USERS U ON U.email = SE.email
        WHERE status=1 and send_time < now() 
        and SE.id in (SELECT MAX(id),email FROM SEND_EMAIL GROUP BY email);`,[]);
    let promises =[]
    promises= emails.rows.map(e=>funcs[e['email_type']-1]({OTP: e['data']['OTP'], name: e['user_name'] ,email: e['email']}))                                    
    let response = await Promise.allSettled(promises)
    response = response.map(e=>(e.reason && e.reason.code )||(e.value && e.value.statusCode))
    promises = emails.rows.map((e,i)=>response[i]=='202'
        ? pool.query(`UPDATE SEND_EMAIL 
                    SET status = 3 ,modified_time = now() 
                    WHERE id= $1 ;`,[e.id])
        : pool.query(`UPDATE SEND_EMAIL 
        SET status = 4 , modified_time = now() 
        WHERE id = $1;`,[e.id]))
    promises =  await Promise.allSettled(promises)
    return promises
  }
  catch(e){
    console.log(e)
  }
}
module.exports =sendCronEmail
