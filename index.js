require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

const bodyParser = require('body-parser');


mongoose.set('strictQuery' , true);
mongoose.connect(process.env.MONGODB_URI) //env
.then(()=>{console.log("db sploot connected")})
.catch((err)=>{console.log(err)});

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

// routes
app.use(userRoutes);
app.use(articleRoutes);


app.get('/' , (req,res)=>{
    res.send('root route');
})

let port = process.env.PORT || 8080;
app.listen(port , ()=>{
    console.log('server connected at port 8080')
})







