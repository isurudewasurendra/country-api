const Joi = require('joi')
const validateFunction = {}

validateFunction.validateId = function (req, res, next) {
    const schema = {
        id: Joi.number().required()
    };
    const result = Joi.validate(req.params, schema)
    if (result.error) {
        res.status(400).send(result.error.details)
        return
    } else {
        next()
    }
}

validateFunction.validateCountry = function (req, res, next) {
    const schema = {
        id: Joi.number().required(),
        country_name: Joi.string().required(),
        saarc_status: Joi.string().required(),
        created_by_user: Joi.number().required(),
        modified_by_user: Joi.number().required(),
        creation_time: Joi.date().required(),
        modification_time: Joi.date().required()
    };
    const result = Joi.validate(req.body, schema)
    if (result.error) {
        res.status(400).send(result.error.details)
        return;
    } else {
        next()
    }
}

module.exports = validateFunction

