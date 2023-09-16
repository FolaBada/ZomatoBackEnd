import express from "express";

//Database Model
import { MenuModel, ImageModel } from "../../Database/allModels";
import { ValidateMenuId, ValidateMenuImage } from "../../Validation/menu";

const Router = express.Router();

//Route         /list
//Des           Get the list of menu based on id
//Params        _id
//Access        Public
//Method        Get

Router.get("/list/:_id", async (req,res) => {
    try{
        await ValidateMenuId(req.params);
        const {_id} = req.params;
        const menus = await MenuModel.find(_id);
        return res.json({menus});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


//Route         /image
//Des           Get menu image based on id
//Params        _id
//Access        Public
//Method        Get

Router.get("/image/:_id", async(req,res) => {
    try{
        await ValidateMenuImage(req.params);
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);
        return res.json({menus});

    } catch (error) {
        return res.stauts(500).json({error: error.message});
    }
})


export default Router;
