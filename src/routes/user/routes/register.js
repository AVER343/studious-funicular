const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../../../db/orm/user/index');
const responseHanding = require('../../../utils/response-handling/response-handling(default_error)');

router.post('/register',
        body('email').isEmail().withMessage('Invalid email !'),
        body('password').isLength({min:5}).withMessage('Password cannot be smaller than 5 letters !'),
        body('user_name').isLength({min:1}).withMessage('Username must be provided !'),
        body('password').isStrongPassword().withMessage('Password is not strong enough !'),
        async (req,res)=>{
            try{
                let {user_name,email,password,confirm_password} = req.body
                if(password!==confirm_password)
                {
                    throw new Error('Password and Confirm Password are not same.')
                }
                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return responseHanding({e:errors.array(),res})
                }
                let user = new User({user_name,email,password}) 
                await user.createUser()
               let OTP =  await user.generateOTP()
                user.deleteFields()
                user.addEmailToDatabase({email:user.email,email_type:1,data:{OTP}})
               res.status(201).send({success:[{message:'Account has been created !', status:'success'}]})
            }
            catch(e){
                console.log(e)
                responseHanding({res,e})
            }
})
module.exports = router