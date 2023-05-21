const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Article = require('../models/Article');
const { find } = require('../models/User');
const router =  express();

// posting an article
router.post('/api/users/:userId/articles' , async(req,res)=>{
    let {userId} = req.params;
    let {title , description} = req.body;

    let token  = req.get('Authorization').split(' ').pop();
   
    let decodedToken = jwt.verify(token , 'SPLOOT');
    //check if user exists in our User DB
    // console.log(decodedToken._id,'decodedtoken');
    // if(!decodedToken){
    //     res.json({
    //         statusCode: 404,
    //         data: null, 
    //         message:'No such token exist i.e user not loggedin',
    //         error:null
    //     })
    // }
    // else{  
        try{
            let userExists = await User.findById(userId);
            if(userExists._id != decodedToken._id){
                res.json({
                    statusCode: 400,
                    data: null, 
                    message:'No such User exists',
                    error:null
                })
            }
            else{
                //create a new article
                let newArticle = new Article({
                    title:title,
                    description:description
                })
                // save the new article in article array of user
                userExists.articles.push(newArticle);

                await newArticle.save();
                await userExists.save();
                res.json({
                    statusCode: 201,
                    data: newArticle, 
                    message:'Articelle created successfully',
                    error:null
                })
            } 
        }
        catch(e){
            res.json({
                error:'problem in findOne'
            })
        }
    // }
})

// get all the articles
router.get('/api/articles' , async(req,res)=>{
    try{
        let allArticles = await Article.find({})
        res.json({
            statusCode: 200,
            data: allArticles, 
            message:'Fetched all the articles present',
            error:null
        })
    }
    catch(e){
        res.json({
            statusCode: 404,
            data: null, 
            message:'Error while fetching the articles',
            error:'Error while fetching the articles'
        })
    }
})



module.exports = router;