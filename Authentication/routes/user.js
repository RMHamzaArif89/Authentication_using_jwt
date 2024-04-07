const express=require('express')
const router=express.Router()
const userModel=require('../model/user')
const bodyParser=require('body-parser')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
//middleware
router.use(cookieParser())
const verifyToken=require('../middleware/authMiddleware')

router.use(express.urlencoded({extended:true}))
router.use(express.json())



router.get('/register',(req,res)=>{
    res.render('register')
})




router.post('/userRegister',async(req,res)=>{
    
    
    try{
        const{name,email,password}=req.body

        const user= await userModel.findOne({email})
        if(user){
           return  res.render('login')
        }
           
        let hashPassword=await bcrypt.hash(password,10)

        const userDetail=new userModel({
            name,
            email,
            password:hashPassword
        })

        const token = jwt.sign({ userId: userDetail._id ,email}, 'jwt-secret-key', {
            expiresIn: '1h',
            });
                     //generate cookies
 res.cookie('jwt', token,{
    expires:new Date(Date.now() + 50000),
    httpOnly:true
 })
           

        const newUser= await userModel.create(userDetail)
     
    
        res.redirect('/home')
    }
   
    catch(err){
     res.send(err)
    }

})






router.post('/login',async(req,res)=>{
  try{
    const{email,password}=req.body;
    let user=await userModel.findOne({email})
    
    if(!user){
     return res.render('login',{message:'email is wrong'})
    }
 
    let isMatch=await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        return res.render('login',{message:'Password is wrong'})
    }
    const token = jwt.sign({ userId: user._id ,email}, 'jwt-secret-key', {
        expiresIn: '1h',
        });
         //generate cookies
 res.cookie('jwt', token,{
    expires:new Date(Date.now() + 50000),
    httpOnly:true
 })
     res.redirect('/home')
  }
  catch(e){
    res.send(e)
  }
})


router.get('/home',verifyToken,(req,res)=>{
   try{
    res.render('home',{title:'Home|Page'})
   }
   catch(e){
    res.send(e)
   }
})
router.get('/login',(req,res)=>{
    res.render('login',{message:''})
})


router.get('/logout',(req,res)=>{
  try{
    res.clearCookie('jwt');
    res.redirect('/login')
  }
  catch(e){
    res.send(e)
  }
  
})





module.exports=router;