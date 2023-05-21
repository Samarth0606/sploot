const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');

const bodyParser = require('body-parser');


mongoose.set('strictQuery' , true);
mongoose.connect('mongodb://127.0.0.1:27017/sploot')
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


app.listen(8080 , ()=>{
    console.log('server connected at port 8080')
})







