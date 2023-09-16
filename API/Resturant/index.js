import { ResturantModel } from "../../Database/resturant";
import express from "express";

//Validation
import { ValidateResturantCity, ValidateResturantSearchString } from "../../Validation/resturant";
import { ValidateResturantId } from "../../Validation/food";
const Router = express.Router();


//Route         /newResturant
//Des           Create a resturant
//Params        None
//Access        Public
//Method        Get

Router.post("/newResturant", async(req, res) => {
    try{
        await ResturantModel.findName(req.body)

        //DB
        const newResturant = await ResturantModel.create(req.body)

        res.status(200).json({newResturant})

    } catch(error) {
        return res.status(500).json({error: error.message});
    }
})

//Route         /
//Des           Get all resturants details
//Params        None
//Access        Public
//Method        Get

Router.get("/", async(req,res) => {
    try{
        await ValidateResturantCity(req.query)

        const {city} = req.query;
        const resturants = await ResturantModel.find({city});
        return res.json({resturants});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});


//Route         /
//Des           Get particular resturant details on id
//Params        _id
//Access        Public
//Method        Get

Router.get("/:_id", async(req,res) => {
    try{
        await ValidateResturantId(req.params);

        const {_id} = req.params;
        const resturant = await ResturantModel.findOne(_id);

        if(!resturant)
        return res.status(404).json({error: "Resturant not fouund"});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
});

//Route         /
//Des           Get all details search
//Params        None
//Body          searchString
//Access        Public
//Method        Get

Router.get("/search", async(req,res) => {
    try{

        await ValidateResturantSearchString(req.body);  
        const {serachString} = req.body;

        const resturants = await ResturantModel.find({
            name: {$regex: serachString, $options: "i"},
        });
        return res.json({resturants});

    } catch(error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;