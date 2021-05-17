const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../../../db/orm/user');
const defaultError = require('../../../utils/error-handling/error');
router.post('/register',
        body('email').isEmail(),
        body('password').isLength({min:5}),
        body('user_name').isLength({min:1}),
        body('confirm_password').isLength({min:5})
        ,async (req,res)=>{
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
                await user.save()
                await user.sendEmailVerificationMail({reset_password:false})
                delete user.jwt
               res.status(201).send({user})
            }
            catch(e){
                console.log(JSON.stringify(e))
                defaultError({res,e})
            }
})
module.exports = router