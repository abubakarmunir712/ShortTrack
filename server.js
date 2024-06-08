const  express= require('express')
const cookieParser = require('cookie-parser')
const app =express()
const path = require('path')
const mongoose = require('mongoose')
const authRoutes = require('./routes/userRoute')
const linkRoutes = require('./routes/shortLinkRoute')
require('dotenv').config()

//MiddleWare
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')


//Connecting to database
mongoose.connect(process.env.DB_CONNECTION_STRING)
.then((result)=>{

    console.log("Connected to the database") 
    app.listen(process.env.PORT || 3000)
})
.catch((err)=>{
    console.log("Err",err)
})

//Setting routes
app.use(authRoutes)
app.use(linkRoutes)

    