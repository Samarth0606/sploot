const jwt = require('jsonwebtoken');

let authenticatedUser = function(req,res,next){
    let header = req.get('Authorization');
    if(!header){
        return res.status(401).json({
            statusCode: 401,
            data: null, 
            message:'Token was not sent',
            error:'Token was not sent'
        })
    }
    let token  = header.split(' ').pop();
    let decodedToken;
    try{
        decodedToken = jwt.verify(token , process.env.JWT_SECRET);
    }
    catch(e){
        return res.json({
            statusCode: 401,
            data: null, 
            message:'Invalid token',
            error:'Invalid token'
        })
    }
    console.log(decodedToken);
    
    req.user = decodedToken;

    next();
}

module.exports = {authenticatedUser} ;