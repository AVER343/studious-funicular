const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const sgMail = require('@sendgrid/mail');
const User = require('../db/orm/user')
let defaultError = require('../utils/error-handling/error');
const authentication = require('../middleware/auth');
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
                defaultError({res,e})
            }
})
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
router.get('/logout',authentication,async(req,res)=>{
    res.clearCookie('as');
    res.send({messages:[{message:'You have successfully logged out ! '}]})
})
module.exports = router