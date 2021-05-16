const express = require('express')
const router =express.Router()
// var { body, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user');
// const defaultError = require('../../../utils/error-handling/error');
const authentication = require('../../../middleware/auth')
router.get('/me',authentication,async(req,res)=>{
    let user = new User({...req.user})
    user.deleteFields()
    res.send({user})
})
router.get('/all/users',async(req,res)=>{
    let users = await User.findUsers()
    res.send({users})
})
module.exports = router