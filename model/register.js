const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')


const studentSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    gender:{type:String,required:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true}

})


//  jwt
studentSchema.methods.generateAuthToken = async function (){
  try{
    const token = await jwt.sign(
      {_id:this._id}, 'abcghbnmvbcdujnmbgthbvcdescxzaet'
       )
       await this.save()
       console.log(this._id)
       console.log(token)
       return token
     
 // console.log(this.password)
 // console.log(this.cpassword)
  
}catch (error) {
  console.log(error)
}}


// bcrypt

studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  this.cpassword = await bcrypt.hash(this.cpassword, 10)
  console.log(this.password)
  console.log(this.cpassword)
  next()
})




const Register = new mongoose.model('Register',studentSchema)

module.exports=Register