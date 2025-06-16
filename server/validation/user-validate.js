const {object,string} = require('yup')

// register
const validate_1 = object({
    username:string().min(3).max(255).required(),
    email:string().email().required(),
    password:string().min(8).max(255).required(),
    role:string(),
})

// login
const validate_2 = object({
    username:string().min(3).max(255),
    email:string().email().required(),
    password:string().min(8).max(255).required(),
    role:string(),
})

// update
const validate_3 = object({
    username:string().min(3).max(255),
    email:string().email(),
    password:string().min(8).max(255),
    role:string(),
})


module.exports = {
    validate_1,
    validate_2,
    validate_3
}