const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../../../db/orm/user/index');
const defaultError = require('../../../utils/response-handling/response-handling(default_error)');
const addEmailToDatabase = require('../../../db/orm/email/addEmailToDatabase');
router.post('/register',
        body('email').isEmail(),
        body('password').isLength({min:5}).withMessage('Password cannot be smaller than 5 letters !'),
        body('user_name').isLength({min:1}).withMessage('Username must be provided !'),
        body('confirm_password').isLength({min:5}),
        body('password').isStrongPassword(),
        async (req,res)=>{
            try{
                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return defaultError({e:errors.array(),res})
                }
                let {user_name,email,password,confirm_password} = req.body
                if(password!==confirm_password)
                {
                    throw new Error('Password and Confirm Password are not same.')
                }
                let user = new User({user_name,email,password}) 
                await user.createUser()
               let OTP =  await user.generateOTP()
                user.deleteFields()
                user.addEmailToDatabase({email:user.email,email_type:1,data:{OTP}})
               res.status(201).send({user})
            }
            catch(e){
                defaultError({res,e})
            }
})
module.exports = router