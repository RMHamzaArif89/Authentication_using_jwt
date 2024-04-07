//this collection will be use to find filter or search the products|data ...

const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    //these are the names of input...name='name'
    name:{
        type:String,
        // required:true

    },
    email:{
        type:String
    },
    password:{
        type:String,
        unique:true
    }

})


// mongoose collection name specfied//created the new collection|table
const usersDetail= new mongoose.model("userDetail",userSchema)

//export the schema that will be import in the main.js file
module.exports=usersDetail;
