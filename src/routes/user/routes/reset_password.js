const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../../../db/orm/user');
const defaultError = require('../../../utils/response-handling/response-handling(default_error)');
// const authentication = require('../../../middleware/auth')
router.post('/reset/password',
    body('email').isEmail(),
    async(req,res)=>{
    try{ 
            const errors = validationResult(req);
            if (!errors.isEmpty()){
            return defaultError({e:errors.array(),res})
            }
            let {email} = req.body
            ///check if user exists
            let user = await User.findOne({email})
            await user.sendEmailVerificationMail({reset_password:true})
            res.send({messages:[{message:'OTP sent to your email !'}]})
    }
    catch(e){
        defaultError({res,e})
    }
})

module.exports = router