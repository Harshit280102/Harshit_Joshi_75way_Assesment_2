import Joi from "joi";

export const valiadationSchema=Joi.object({
    name:Joi.string().min(4).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password:Joi.string().min(5).max(35).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const validateTime=Joi.object({
    storeName:Joi.string().required(),
    open:Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    close:Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    noOfEmp:Joi.number().min(0).default(0),
})

export const valiadationRegisterationSchema=Joi.object({
    name:Joi.string().min(4).max(30).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password:Joi.string().min(5).max(35).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    store_id:Joi.string(),
})
