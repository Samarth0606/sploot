let Joi = require('joi');

// signup validator
const signup = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string()
                .min(3)
                .max(30)
                .required(), 
        age: Joi.number()
                .min(5)
                .max(100)
                .required(), 
        email: Joi.string()
                .required()
                .email({ 
                    minDomainSegments: 2, 
                    tlds: { allow: ['com', 'net'] } 
                }), 
        passWord: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(8)
                    .required()
    })

    const joiValidator = schema.validate(req.body);
    if(joiValidator.error){
        return res.status(400).json({
            statusCode: 400,
            data: null, 
            message:'invalid input',
            error:joiValidator.error
        })
    }
    next();
}

// login validator
const login = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string()
                .required()
                .email({ 
                    minDomainSegments: 2, 
                    tlds: { allow: ['com', 'net'] } 
                }), 
        passWord: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(8)
                    .required()
    })

    const joiValidator = schema.validate(req.body);
    if(joiValidator.error){
        return res.status(400).json({
            statusCode: 400,
            data: null, 
            message:'invalid input',
            error:joiValidator.error
        })
    }
    next();
}


// edit validator
const editUser = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string()
                .min(3)
                .max(30),
        age: Joi.number()
                .min(5)
                .max(100)
    })

    const joiValidator = schema.validate(req.body);
    if(joiValidator.error){
        return res.status(400).json({
            statusCode: 400,
            data: null, 
            message:'invalid input',
            error:joiValidator.error
        })
    }
    next();
}


module.exports = {signup , login , editUser};