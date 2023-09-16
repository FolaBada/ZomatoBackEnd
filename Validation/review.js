import joi from "joi";

export const ValidateReview = (review) => {
    const Schema = joi.object({
        reviewText: joi.string().required()
    });

    return Schema.validateAsync(review);

};