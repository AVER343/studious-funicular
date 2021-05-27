const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const { NO_USER_FOUND } = require('../../../db/orm/user/error_statements');
const User = require('../../../db/orm/user/index')
let responseHanding = require('../../../utils/response-handling/response-handling(default_error)');
router.post('/login',
        body('email').isEmail().withMessage('Invalid Email !'),
        body('password').isLength({min:5}).withMessage('Invalid password !'),  
async(req,res)=>{
   try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return responseHanding({e:errors.array(),res})
            }
        let {email,user_name,password} = req.body
        let user = new User({email})
        user= await user.findOne({email,user_name})
        if(user.length==0)
        {
            throw new Error(NO_USER_FOUND)
        }
        user = new User({email})
        user = await user.verifyLogin({email,password})
        await user.setJWT()
        user.deleteFields()
        res.cookie('JWT',user.jwt,{maxAge:120*60*1000}).send(user)
   }
   catch(e){
       responseHanding({res,e})
   }
})
module.exports = router