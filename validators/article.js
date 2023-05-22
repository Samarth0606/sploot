let Joi = require('joi');

const article = (req,res,next)=>{
    const schema = Joi.object({
        title: Joi.string()
                .min(3)
                .max(30)
                .required(), 
        description: Joi.string()
                    .min(5)
                    .max(500)
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

module.exports = {article};