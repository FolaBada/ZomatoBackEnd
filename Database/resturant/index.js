import mongoose from "mongoose";

const ResturantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    mapLocation: {type: String, required: true},
    cuisine: [String],
    resturantTimings: String,
    contactNumber: Number,
    website: String,
    popuarDishes: [String],
    averageCost: Number,
    amenities: [String],
    menuImages: {
        type: mongoose.Types.ObjectId,
        ref: "Images"
    },
    menu: {type: mongoose.Types.ObjectId,
    ref: "Menus"
},
    reviews: [{type: mongoose.Types.ObjectId,
    ref: "Reviews"}],
    photos: {type: mongoose.Types.ObjectId,
    ref: "Images"}
},
{
    timestamps: true
})

ResturantSchema.statics.findName = async ({name}) => {
    //check wether the email exists
    const checkResturantByName = await ResturantModel.findOne({name});

    if(checkResturantByName) {
      throw new Error ("Resturant already exists");
    }

    return false;
};


export const ResturantModel = mongoose.model("Resturants", ResturantSchema)