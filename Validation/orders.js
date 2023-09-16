import joi from "joi";

export const ValidateOrderId = (resId) => {
    const Schema = joi.object({
        _Id: joi.string().required()
    });

    return Schema.validateAsync(resId);

};


export const ValidateNewOrder = (newOrder) => {
    const Schema = joi.object({
        order: joi.string.required()
    });

    return Schema.validateAsync(newOrder);

};