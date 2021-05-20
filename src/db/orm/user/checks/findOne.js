const pool = require('../../../postgres')
const add_and=(no_of_arguments,query)=>no_of_arguments>1?query+' and ':query
const check_findOne= async({email,user_name})=>{
    let query= `SELECT * FROM USERS `
    let no_of_arguments = 1
    let args = []
    if(email){
        query = query + `WHERE email=$${no_of_arguments}`
        args.push(email)
        no_of_arguments++
    }
    if(user_name)
    {
        query = add_and(no_of_arguments,query)
        query = query + `${no_of_arguments==1?`WHERE`:''} user_name=$${no_of_arguments}`
        args.push(user_name)
        no_of_arguments++
    }
    query= query +'LIMIT 1;'
    const  user = await pool.query(query,args)
    return user.rows
 }

 module.exports = check_findOne