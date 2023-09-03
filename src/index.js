const express=require('express')
const app=express();
const path=require('path')
const jwt = require('jsonwebtoken')
const hbs=require('hbs')

const port=3500;



  require('../db/conn')
  const Register=require('../model/register')
// path. define
const static_path=path.join(__dirname + '../public')
const template_path=path.join(__dirname, '../templates')
const partials=path.join(__dirname, '../templates/partials')
app.set('view engine','hbs')
app.set('views',template_path)
hbs.registerPartials(partials)
app.use(express.static(static_path))

app.use(express.json())
 app.use(express.urlencoded({extended:true}))  // extended: true => option is used to enable parsing of
 // extended syntax for URL-encoded data, allowing for nested objects in form data

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/home',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{

    try{
        const email=req.body.email
        const password=req.body.password

        
       // console.log(email,password);
       const useremail = await Register.findOne({email:email})
       const matchpassword = await bcrypt.compare(password, useremail.password)
       //res.send(useremail)
       //res.send(useremail.password)
       console.log(matchpassword)
       const token = await useremail.generateAuthToken()
       await jwt.verify(
        token,
         'abcghbnmvbcdujnmbgthbvcdescxzaet'
         )
       if(useremail && matchpassword){
        res.status(201).render('index')
       }else{
        res.send('Password is not matching')
       }
    }catch(e){
  console.log(e);
 // res.send('Password is not matching')
    }
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',async(req,res)=>{
    try{
   // console.log(req.body.firstname);
   //res.send(req.body.firstname)

   const password=req.body.password
   const confirmpassword=req.body.cpassword
   if(password===confirmpassword){
    const registerstudent = new Register({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        gender:req.body.gender,
        password:req.body.password,
        cpassword:req.body.cpassword,
    })
    console.log(registerstudent);
    const token = await registerstudent.generateAuthToken()
    console.log(token)
    //const register=result=
    const cookie = ("jwt",token, {
         expires: new Date(Date.now() + 300000) ,
          httpOnly:true 
        })
    console.log(cookie);
    await registerstudent.save()
    res.status(201).render('index')
   }
    }catch(e){
      
        console.log(e)
        res.send('error')
    }
})

// bcrypt 

const bcrypt=require('bcryptjs')
const securepassword=async (password)=>{
    const passwordhash=await bcrypt.hash(password,10)
    const passwordmatch=await bcrypt.compare(password,passwordhash)
    console.log(passwordmatch)
}
//const passwordmatch=await bycrypt.compare(password,passwordhash)
securepassword('testbookr')




app.listen(port,()=>{
    console.log('server is listening');
})