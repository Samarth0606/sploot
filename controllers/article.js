const User = require('../models/User');
const Article = require('../models/Article');

// ADD ARTICLE
const addArticle = async(req,res)=>{
    let {userId} = req.params;
    let {title , description} = req.body;

    // to match the ids
    if(userId !== req.user._id){
        return res.status(403).json({
            statusCode: 403,
            data: null , 
            message:'Unauthenticted user, User id doesnot match',
            error:'UNAUTHENTICATED_USER'
        })
    }
    
    try{
        let userExists = await User.findById(userId);
        //create a new article
        let newArticle = new Article({
            title:title,
            description:description,
            author:userExists
        })

        // save the new article in article array of user
        userExists.articles.push(newArticle);

        await newArticle.save();
        await userExists.save();
        res.status(201).json({
            statusCode: 201,
            data: newArticle, 
            message:'Article created successfully',
            error:null
        })
    }
    catch(e){
        res.status(401).json({
            statusCode: 401,
            data: null, 
            message:'cannot create a new article',
            error:'SERVER_ERROR'
        })
    }
}


// ALL ARTICLES
const allArticles = async(req,res)=>{
    try{
        let allArticles = await Article.find({}).populate('author');
        res.status(200).json({
            statusCode: 200,
            data: allArticles, 
            message:'Fetched all the articles from DB',
            error:null
        })
    }
    catch(e){
        res.status(404).json({
            statusCode: 404,
            data: null, 
            message:'Error while fetching the articles from DB',
            error:'DATABASE_ERROR'
        })
    }
}


module.exports = {allArticles , addArticle};



