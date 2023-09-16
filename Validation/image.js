import joi from "joi";

export const ValidateImage = (location) => {
    const Schema = joi.object({
        location: joi.string().required()
    });

    return Schema.validateAsync(location);

};