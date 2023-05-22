const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title:{
        type:String , 
        trim:true,
        required:true
    },
    description:{
        type:String , 
        trim:true,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


let Article = mongoose.model('Article' , articleSchema );

module.exports = Article;