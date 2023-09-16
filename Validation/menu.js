import joi from "joi";

export const ValidateMenuId = (resId) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(resId);

};


export const ValidateMenuImage = (menuImg) => {
    const Schema = joi.object({
        munu: joi.string().required()
    });

    return Schema.validateAsync(menuImg);

};