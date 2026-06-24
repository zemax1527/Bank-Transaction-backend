const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email:{
        type : String,
        required : [true, 'email is required '],
        trim : true,
        lowercase : true,
        unique : [true, 'email already exists'],
        match : [/^[a-z0-9]+([._-]?[a-z0-9]+)*@gmail\.com$/, 'Invalid email'],
    },
    name : {
        type : String,
        required : [true, 'name required']
    },
    password:{
        type : String,
        required : [true, 'password is required '],
        minlength : [6, 'password length should be (6-12) character '],
        select : false,
    },
},
{timestamps : true})

userSchema.pre('save', async function(){
      if(!this.isModified('password')){
        return
      }

      const hash = await bcrypt.hash(this.password, 10)
      this.password = hash

})

userSchema.methods.comparePassword = async function (password) {
    
    return await bcrypt.compare( password, this.password )
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;