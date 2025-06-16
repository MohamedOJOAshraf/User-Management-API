const userModel = require('../model/user-model');

const statusText = require('../utils/statusText')

const bcrypt = require('bcryptjs')

const {validate_1,validate_2} = require('../validation/user-validate')

const generateToken = require('../jwt/generateToken')


const register = async (req,res) =>{
    try{
        // validation data before register
        await validate_1.validate(req.body)

        const {email,username,password,role} = req.body;

        const oldEmail = await userModel.findOne({email:email})
        
        const oldUsername = await userModel.findOne({username:username})
        
        // check if the email is used
        if(oldEmail)
            return res.status(400).json({msg:'This Email Is Used',statusText:statusText.FALIED})
        
        // check if the username is used
        if(oldUsername)
            return res.status(400).json({msg:'This Username Is Used',statusText:statusText.FALIED})
           
        // hash password
        const hashingPassword = await bcrypt.hash(password,10)
        
        const newUser = new userModel({
            username,
            email,
            password:hashingPassword,
            role
        })

        // generate token
        const token = await generateToken({username:newUser.username,email:newUser.email,role:newUser.role})

        await newUser.save()
        return res.status(201).json({statusText:statusText.SUCCESS,data:newUser,token})
        
    }catch(err){
        return res.status(400).json({statusText:statusText.ERROR,err})

    }

}

const login = async (req,res) =>{
    try{
        // validation data before login
        await validate_2.validate(req.body)

        const {email,password,username,role} = req.body;

        const user = await userModel.findOne({email:email})

        // check if user is not found
        if(!user)
            return res.status(400).json({msg:'Email Or Password Is wrong',statusText:statusText.FALIED})
        
        // compare the password
        const matchedPassword = await bcrypt.compare(password,user.password)
        
        //check if password is worng
        if(!matchedPassword)
            return res.status(400).json({msg:'Email Or Password Is wrong',statusText:statusText.FALIED})
        
        // generate token
        const token = await generateToken({username:user.username,email:user.email,role:user.role})

        return res.status(200).json({msg:'Active login',statusText:text.SUCCESS,data:user,token})

    }catch(err){
        return res.status(400).json({statusText:statusText.ERROR,err})
    }
}

module.exports = {
    register,
    login
}