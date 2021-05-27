const responseHanding = require("../utils/response-handling/response-handling(default_error)")
const jwt = require('jsonwebtoken')
const User = require("../db/orm/user")
let authentication =async(req,res,next)=>{
    
   try{
       console.log(req.cookies)
       if(!req.cookies.JWT)
       {
            return responseHanding({res,e:{message:'Unauthenticated ! '}})
       }
    const JWT = req.cookies.JWT 
    let verified_user = await jwt.verify(JWT,process.env.JWT_SECRET)
    if(!verified_user){
        throw new Error('Verification failed . Please login again.')
    }
    let user = new User({email:verified_user.email})
    user = await user.findOne({email:verified_user.email})
    req.user = user
    next()
   }
   catch(e)
   {
       responseHanding({res,e})
   }
}
module.exports = authentication