const  express= require('express')
const cookieParser = require('cookie-parser')
const app =express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const user = require('./models/user')

require('dotenv').config()

//MiddleWare
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.urmucvs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURI)
.then((result)=>{

    console.log("Connected to the database") 
    app.listen(process.env.PORT || 3000)
})
.catch((err)=>{
    console.log("Err",err)
})

 