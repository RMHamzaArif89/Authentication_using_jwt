const express=require('express')
const app=express()
const bodyParser = require("body-parser");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//this is middleWare use to encode the form&body request value //example req.body from form
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//set the static folder
app.use(express.static('static'))
//set the view engine
app.set('view engine','ejs')
//set the path simply
app.set('views','views')


//require the db connection
require('./db/conn')
//require the router of user
const userRouter=require('./routes/user')
app.use(userRouter)






app.listen(5000,()=>{
    console.log('port is listening')
})