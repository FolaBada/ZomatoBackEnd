// Env variable
require("dotenv").config();

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

const Router = express();

//Models
import {UserModel} from "../../Database/user"

//Validation
import { ValidateSignup } from "../../Validation/auth";
//import passport from "passport";

// Route    /signup
//Description   Signup with email and password
//Params    none
//Access    Public
//Method    POST

Router.post("/signup", async (req,res) => {
    try{
        await ValidateSignup(req.body.credentials);
        await UserModel.findEmailAndPhone(req.body.credentials)

        //DB
        const newUser = await UserModel.create(req.body.credentials);

        //jwt Auth Token
        const token = newUser.generateJwtToken();

        return res.status(200).json({token});

    } catch (error){
        return res.status(500).json({error: error.message});
    }
});



// Route    /signin
//Description   Signin with email and password
//Params    none
//Access    Public
//Method    POST

Router.post("/signin", async (req,res) => {
    try{
        // await ValidateSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );
    
        //jwt Auth Token
        const token = user.generateJwtToken();

        return res.status(200).json({token, status: "Success"});

    } catch (error){
        return res.status(500).json({error: error.message});
    }
});



// Route    /google
// Description   Google signin
// Params    none
// Access    Public
// Method    GET

Router.get("/google", passport.authenticate("google",{
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
})
);


// Route    /google/callback
//Description   Google signin callback
//Params    none
//Access    Public
//Method    GET

Router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}),
(req,res) => {
    return res.json({token: req.session.passport.user.token});
}
);


export default Router;
