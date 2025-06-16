const mongoose = require('mongoose');
const { type } = require('os');

const userRole = require('../utils/user-roles')

const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:[userRole.USER,userRole.ADMIN,userRole.MANAGER],
        default:userRole.USER
    },
    token:{
        type:String
    }

})

module.exports = mongoose.model('user',userSchema)