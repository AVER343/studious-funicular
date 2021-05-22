const express = require('express')
const router =express.Router()
// var { body, validationResult }  = require('express-validator');
const User = require('../../../db/orm/user/index');
// const defaultError = require('../../../utils/error-handling/error');
const authentication = require('../../../middleware/auth')
router.get('/me',authentication,async(req,res)=>{
    let user = new User({...req.user})
    user.deleteFields()
    res.send({user})
})
router.get('/all/users',async(req,res)=>{
    let users=new User({})
    users = (await users.find({})).map(e=>new User(e))
    users.map(e=>e.deleteFields())
    res.send({users})
})
module.exports = router