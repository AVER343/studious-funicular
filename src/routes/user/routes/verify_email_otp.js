const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user');
const defaultError = require('../../../utils/response-handling/response-handling(default_error)');
router.post('/email/otp',
            body('email').isEmail(),
            body('otp').isLength({min:4}),
        async(req,res)=>{
    try{ 
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return defaultError({e:errors.array(),res})
        }
         let {email,otp,password} = req.body
         ///check if user exists
         let user = await User.verifyOTP({email,otp})
         if(password){
             await user.changePassword(password)
             return res.send({messages:[{message:'Password has been changed !'}]})
         }
         res.send(user)
    }
    catch(e){
        defaultError({res,e})
    }
 })
module.exports = router