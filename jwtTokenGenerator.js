
let jwt = require('jsonwebtoken');

function generateAuthToken(data){
    let token = jwt.sign(data.toObject() , process.env.JWT_SECRET ,{ expiresIn: '2 days' } )
    // console.log(process.env.JWT_SECRET);

    return token;
}

module.exports = generateAuthToken;