import express from "express";

import { UserModel } from "../../Database/user";
import { ValidateUpdateUser, ValidateUser } from "../../Validation/user";

const Router = express.Router();

//Route         /_id
//Des           Get a user data
//Params        _id
//Body          none
//Access        Public
//Method        GET

Router.get(":_id", async(req,res) =>{
    try{
        await ValidateUser(req.params);
        const{ _id } = req.params;

        const getUser = await UserModel.findById(_id);

        return res.json({user: getUser})
    } catch (error){
        return res.jason(500).json({error: error.message});
    }
}); 

//Route         /update
//Des           Update a user data
//Params        _id
//Body          user data
//Access        Public
//Method        PUT

Router.put("/update/:_userId", async(req,res) =>{
    try{
        await ValidateUpdateUser(req.body);
        const{ _id } = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData
            },
            {new: true}
        )

        const getUser = await UserModel.findById(_id);

        return res.json({user: getUser})
    } catch (error){
        return res.jason(500).json({error: error.message});
    }
}); 


export default Router;