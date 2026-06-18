const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type : String,
        required : [true, 'email is required '],
        trim : true,
        lowercase : true,
        unique : [true, 'email already exists'],
        match : [/^[a-z0-9]+(?!.*(?:\\+{2,}|\\-{2,}|\\.{2,}))(?:[\\.+\\-]{0,1}[a-z0-9])*@gmail\\.com$/, 'Invalid email'],
    },
    name : {
        type : String,
        required : [true, 'name required']
    },
    password:{
        type : String,
        required : [true, 'password is required '],
        minlength : [6, 'password length should be (6-12) character '],
        maxlengyh : [12, 'password length should be (6-12) character '],
        select : false,
    },
},
{timestamps : true})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;