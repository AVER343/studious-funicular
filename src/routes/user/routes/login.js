const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user')
let defaultError = require('../../../utils/response-handling/response-handling(default_error)');
router.post('/login',
        body('email').isEmail(),
        body('password').isLength({min:5}),  
async(req,res)=>{
   try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return defaultError({e:errors.array(),res})
            }
        let {email,password} = req.body
        await User.findOne({email})
        let user = await User.verifyLogin(email,password)
        await user.createJWT()
        res.cookie('JWT',user.jwt,{maxAge:120*60*1000}).send(user)
   }
   catch(e){
       defaultError({res,e})
   }
})
module.exports = router