import joi from "joi";

export const ValidateResturantCity = (resturantObj) => {
    const Schema = joi.object({
        city: joi.string().required()
    });

    return Schema.validateAsync(resturantObj);

};

export const ValidateResturantSearchString = (resturantObj) => {
    const Schema = joi.object({
        serachString: joi.string().required()
    });

    return Schema.validateAsync(resturantObj);

};