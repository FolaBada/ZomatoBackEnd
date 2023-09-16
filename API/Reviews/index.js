import express from "express";

import { ReviewModel } from "../../Database/reviews";
import { ValidateReview } from "../../Validation/review";

const Router = express.Router();

//Route         /new
//Des           add new review
//Params        None
//Body          review object
//Access        Public
//Method        POST

Router.post("/new/:_id", async(req,res) =>{
    try{
        await ValidateReview(req.body);
        const{ reviewData } = req.body;

        await ReviewModel.create(reviewData);

        return res.json({review: "Successfully created Review"})
    } catch (error){
        return res.jason(500).json({error: error.message});
    }
});

//Route         /delete
//Des           delete review
//Params        _id
//Access        Public
//Method        Delete

Router.delete("/delete/:_id", async(req,res) =>{
    try{
        const{ _id } = req.params;

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({review: "Successfully deleted Review"})
    } catch (error){
        return res.jason(500).json({error: error.message});
    }
});


export default Router;