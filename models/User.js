const mongoose = require('mongoose');

let userSchema  = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    age:{
        type: Number,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required: true,
        unique:true
    },
    passWord:{
        type:String,
        trim:true,
        required: true
    },
    articles:[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'Article'
        }
    ]
})

const User = mongoose.model('User' , userSchema );
module.exports = User;