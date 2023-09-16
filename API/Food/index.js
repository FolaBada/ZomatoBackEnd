import Express from "express";

//Database Model
import { FoodModel } from "../../Database/food";

//Validation
import { ValidateResturantId, ValidateCategory } from "../../Validation/food";

const Router = Express.Router();

//Route         /
//Des           Get all food based on particular resturant
//Params        _id
//Access        Public
//Method        Get


Router.get("/:_id", async(req,res) => {
    try{
        await ValidateResturantId(req.params);

        const { _id } = req.params;
        const foods = await FoodModel.find({ resturant: _id });
        return res.json({foods});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//Route         /r
//Des           Get all the food based on particular category
//Params        catrgory
//Access        Public
//Method        Get

Router.get("/r/:category", async(req,res) => {
    try{
        await ValidateCategory(req.params);

        const { category } = req.params;
        const foods = await FoodModel.find({
            category: {$regex: category, $options: "i"}
        });
        return res.json({foods});
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

export default Router;