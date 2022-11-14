import joi from 'joi';


const newMediaSchema = joi.object({
    title: joi.string().min(2).max(100).required(),
    link: joi.string().uri().required(),
    relevance: joi.number().integer().min(1).max(5).required(),
    platform: joi.string().allow("")
});

export {newMediaSchema}