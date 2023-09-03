const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/ElevenApril')
.then(()=>
    console.log('Connection has made'))
.catch(()=>
   
        console.log('Connection has not made'))
