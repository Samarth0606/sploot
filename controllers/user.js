const User = require('../models/User');
const bcrypt =  require('bcrypt');
const generateAuthToken = require('../jwtTokenGenerator');


// SIGNUP
const signup = async(req,res)=>{
    let user = req.body;
    // check if email already existed
    let Email = await User.findOne({email:user.email});
    if(Email){
        return res.status(409).json({
            statusCode: 409,
            data: null, 
            message:'Email already exists',
            error:null
        });
    }
    else{
        // create a new user
        user.passWord = await bcrypt.hash(user.passWord , 10);
        let dbUser = new User({
            name:user.name,
            age:user.age,
            email:user.email.toLowerCase(),
            passWord: user.passWord
        })   
        await dbUser.save(); //save user in db

         // delete not important info for user
         dbUser = dbUser.toObject();
         delete dbUser.passWord; //deleting password from login user
         delete dbUser.__v; //deleting __v from login user

        return res.status(200).json({
            statusCode: 200,
            data: dbUser, 
            message:'You have successfully Signed up',
            error:null
        })
    }
}

// LOGIN
const login = async(req,res)=>{
    let userFormData = req.body ;
    // check if this email exist or not AND POPULATE with articles
    let userDBdata = await User.findOne({email:userFormData.email}).populate('articles');
    // console.log(userDBdata , '-passWord');
    if(!userDBdata){
        return res.status(404).json({
            statusCode: 404,
            data: null, 
            message:'No such user with email is available, please check your email',
            error:'EMAIL_NOT_FOUND'
        })
    }
    else{
        // match the passwords
        let validatePass = await bcrypt.compare(userFormData.passWord,userDBdata.passWord)
        if(!validatePass){
            return res.status(401).json({
                statusCode: 401,
                data: null, 
                message:'Password doesnot match, incorrect password',
                error:'UNAUTHENTICATED_USER'
            })
        }
        // generate token
        let token = generateAuthToken(userDBdata);
        // delete not important info for user
        userDBdata = userDBdata.toObject();
        delete userDBdata.passWord; //deleting password from login user
        delete userDBdata.__v; //deleting __v from login user

        return res.status(200).json({
            statusCode: 200,
            data:{
                token:token,
                userDBdata:userDBdata
            } , 
            message:'User has loggedin successfully',
            error:null
        })
    }
}

// EDIT USER
const updateUser = async(req,res)=>{

    let {userId} = req.params;

    // to match the ids
    if(userId !== req.user._id){
        return res.status(403).json({
            statusCode: 403,
            data: null , 
            message:'Unauthenticted user, User id doesnot match',
            error:'UNAUTHENTICATED_USER'
        })
    }

    let {name , age} = req.body;
    try{
        await User.findByIdAndUpdate(userId , {name , age});
        let updatedUser = await User.findById(userId);
        console.log(updatedUser , 'updated')
        res.status(200).json({
            statusCode: 200,
            data: updatedUser , 
            message:'Edited the user successfully',
            error:null
        })
    }
    catch(e){
        res.status(200).json({
            statusCode: 200,
            data:null , 
            message:'Unable to edit the user',
            error:'SERVER_ERROR'
        })
    }
}

module.exports = {signup , login , updateUser};