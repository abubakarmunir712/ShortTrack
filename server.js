const  express= require('express')
const cookieParser = require('cookie-parser')
const app =express()
const path = require('path')

require('dotenv').config()

//MiddleWare
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

