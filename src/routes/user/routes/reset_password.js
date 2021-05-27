const express = require('express')
const router =express.Router()
const bcrypt = require('bcryptjs')
var { param, body, validationResult ,header }  = require('express-validator');
const User = require('../../../db/orm/user/index');
const responseHanding = require('../../../utils/response-handling/response-handling(default_error)');
const { NO_USER_FOUND } = require('../../../db/orm/user/error_statements');
router.post('/reset/password',
    body('email').isEmail().withMessage('Invalid Email !'),
    body('password').isLength({min:5}).withMessage('Password cannot be smaller than 5 letters !'),
    body('otp').isLength({min:3}).withMessage('Incorrect OTP provided!'),
    async(req,res)=>{
    try{ 
            const errors = validationResult(req);
            if (!errors.isEmpty()){
            return responseHanding({e:errors.array(),res})
            }
            let {email,password,otp} = req.body
            let user = new User({email})
            let existing_user = await user.findOne({email})
            if(existing_user.length==0)
            {
                throw new Error(NO_USER_FOUND)
            }
            await user.verifyOTP({email,otp,user:existing_user[0]})
            res.send({messages:[{message:'Password has been changed !'}]})
    }
    catch(e){
        responseHanding({res,e})
    }
})
router.get('/reset/password/:id',
    param('id').isEmail().withMessage('Invalid Email !'),
    async(req,res)=>{
    try{ 
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return responseHanding({e:errors.array(),res})
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
        responseHanding({res,e})
    }
})

module.exports = router