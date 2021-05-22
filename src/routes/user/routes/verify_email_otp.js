const express = require('express')
const router =express.Router()
var { body,param, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user/index');
const pool = require('../../../db/postgres');
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
        let user = new User({email,password})
        user = await user.verifyOTP({email,otp})
        await pool.query('UPDATE USERS SET EMAIL_VERIFIED = true where id = $1'[user.id])
         res.send(user)
    }
    catch(e){
        defaultError({res,e})
    }
 })
 router.get('/email/otp/:id',
    param('id').isEmail().withMessage('Invalid Email !'),
    async(req,res)=>{
    try{ 
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return defaultError({e:errors.array(),res})
        }
            let {id} = req.params
            let email = id
            let user = new User({email:id})
            let existing_user = await user.findOne({email:id})
            if(existing_user.length==0)
            {
                throw new Error(NO_USER_FOUND)
            }
            let OTP = await user.generateOTP(email);
            await user.addEmailToDatabase({email,email_type:2,data:{OTP}})
            res.send({messages:[{message:'Email has been sent to your email !'}]})
    }
    catch(e){
        defaultError({res,e})
    }
})
module.exports = router