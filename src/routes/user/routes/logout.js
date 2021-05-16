const express = require('express')
const router =express.Router()
var { body, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user');
// const defaultError = require('../../../utils/error-handling/error');
const authentication = require('../../../middleware/auth')
router.get('/logout',authentication,async(req,res)=>{
    res.clearCookie('JWT');
    res.send({messages:[{message:'You have successfully logged out ! '}]})
})
module.exports= router