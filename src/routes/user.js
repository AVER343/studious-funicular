const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../db/orm/user')
let defaultError = require('../utils/error-handling/error')
router.post('/register',
        body('email').isEmail(),
        body('password').isLength({min:5}),
        body('user_name').isLength({min:1})
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
               res.status(201).send({user})
            }
            catch(e){
                defaultError({res,e})
            }
})
router.post('/login',async(req,res)=>{
   try{
        let {email,password} = req.body
        await User.findOne({email})
        let user = await User.verifyLogin(email,password)
        await user.createJWT()
        res.send(user)
   }
   catch(e){
       defaultError({res,e})
   }
})
module.exports = router