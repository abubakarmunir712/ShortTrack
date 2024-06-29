const  express= require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app =express()
const path = require('path')
const mongoose = require('mongoose')
const authRoutes = require('./routes/userRoute')
const linkRoutes = require('./routes/shortLinkRoute')
const clickRoutes = require('./routes/clickRoute')
require('dotenv').config()

//MiddleWare
app.use(cors())
app.use(express.json())
app.set('trust proxy', 1);
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
app.use(clickRoutes)


app.get('/',(req,res)=>{
    res.send('api running')
})

    