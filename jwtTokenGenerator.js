
let jwt = require('jsonwebtoken');

function generateAuthToken(data){
    data = JSON.stringify(data);
    let token = jwt.sign(data , 'SPLOOT')
    return token;
}

module.exports = generateAuthToken;