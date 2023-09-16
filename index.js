require ("dotenv").config();


import  express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
const path = require("path");


//config
import googleAuthConfig from "./config/google.config"
import routeConfig from "./config/route.config";

//API
import Auth from "./API/Auth";
import Resturant from "./API/Resturant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Orders from "./API/Orders";
import Review from "./API/Reviews";
import Users from "./API/User";
//Database connection
import ConnectDB from "./Database/connecction";
// import passport from "passport";

const zomato = express();

zomato.use(express.static(path.join(__dirname + "/Public")));
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());


// //passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//For application routes
// localhost:4000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/resturant", Resturant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Orders);
zomato.use("/reviews", Review);
zomato.use("/user", Users);



zomato.get("/", (req,res) => res.json({message: "Setup Successful"}));

zomato.listen(4000, () => 
ConnectDB().then(() => console.log('Server is up and running'))
.catch(() => console.log("DB connection failed")));