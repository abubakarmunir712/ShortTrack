const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {isEmail} = require('validator')
const clickSchema = new Schema({
    link:{
        type:String,
        required:true,
    },
    ip:{
        type:String
    },
    OS:{
        type:String
    },
    browser:{
        type:String
    },
    Refferer:{
        type:String
    },
    Device:{
        type:String
    },
    Location:{
        type:String
    },
    Proxy:{
        type:String
    },
    Blocked:{
        type:Boolean,
        default:false
    },
    Reason:{
        type:String,
        enum:["Browser","Device","Proxy","Location","OS","None","Referrer"],
        default:"None",
    },
    Email:{
        type:String,
        validate:[isEmail, 'Please provide a valid email']
    },
    Verified:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


const clicks = mongoose.model('click',clickSchema)
module.exports = clicks;