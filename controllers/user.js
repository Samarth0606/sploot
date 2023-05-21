const User = require('../models/User');
let bcrypt =  require('bcrypt');
const generateAuthToken = require('../jwtTokenGenerator');


const signup = async(req,res)=>{
    let user = req.body;
    // check if email already existed
    let Email = await User.findOne({email:user.email});
    if(Email){
        return res.json({
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
        return res.json({
            statusCode: 200,
            data: dbUser, 
            message:'You have successfully Signed up',
            error:null
        })
    }
}


const login = async(req,res)=>{
    let userFormData = req.body ;
    // check if this email exist or not
    let userDBdata = await User.findOne({email:userFormData.email}).populate('articles');
    console.log(userDBdata , 'populated') //remove comment
    if(!userDBdata){
        return res.json({
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
            return res.json({
                statusCode: 401,
                data: null, 
                message:'Password doesnot match, incorrect password',
                error:null
            })
        }
        // generate token
        let token = generateAuthToken(userDBdata);
        return res.json({
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
        res.json({
            statusCode: 200,
            data: updatedUser , 
            message:'Edited the user successfully',
            error:null
        })
    }
    catch(e){
        res.json({
            statusCode: 200,
            data:null , 
            message:'Unable to edit the user',
            error:'SERVER_ERROR'
        })
    }
}

module.exports = {signup , login , updateUser};