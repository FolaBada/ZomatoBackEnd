import joi from "joi";

export const ValidateUser = (resId) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(resId);

};



export const ValidateUpdateUser = (updateUser) => {
    const Schema = joi.object({
        user: joi.string().required()
    });

    return Schema.validateAsync(updateUser);

};
