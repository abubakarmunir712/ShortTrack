const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate: [isEmail,'Please provide a valid email']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[8,'Password must be at least 8 characters long']
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


userSchema.pre('save',async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt)
next()
})

module.exports = mongoose.model('user',userSchema)