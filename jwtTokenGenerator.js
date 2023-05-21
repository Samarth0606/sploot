
let jwt = require('jsonwebtoken');

function generateAuthToken(data){
    data = JSON.stringify(data);
    let token = jwt.sign(data , process.env.JWT_SECRET)
    // console.log(process.env.JWT_SECRET);

    return token;
}

module.exports = generateAuthToken;