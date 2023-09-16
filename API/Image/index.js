import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Database Model

import { ImageModel } from "../../Database/allModels";

//Utilities
import {s3Upload} from "../../Utils/AWS/s3";
import { ValidateImage } from "../../Validation/image";


const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

//AWS S3 bucket config



// Route           /
// des             Uploading given image to s3 bucket and then saving 
// params          None  
// Access          Public 
// Method          Get

Router.post("/",upload.single("file"), async (req,res) =>{
    try{
        await ValidateImage(req.params);
        const file = req.file;

        //S3 bucket options
        const bucketOptions = {
            Bucket: "badaa",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };


        const uploadImage = await s3Upload(bucketOptions);



    } catch (error){
        return res.status(500).json({error: error.message})
    }
});

export default Router;