import googleOAuth from "passport-google-oauth20";
import passport from "passport";
import { UserModel } from "../Database/allModels";
;

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: "255221607854-tdvqbisjvk3t7uscgvthcmm3usrk9sbs.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:4000/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, done) => {
           
           //Creating a new User
            const newUser = {
            fullname: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value
            };
            try{
                //Check wether User exists or not
                const user = await UserModel.findOne({email: newUser.email})
                if(user) {
                     //Generating jwt token
                const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                } else{
                    //create a user
                    const user = await UserModel.create(newUser);

                     //Generating jwt token
                const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                }
            }catch (error) {
                done(error, null);
            } 
        }
        )
    );
    passport.serializeUser((userData, done) => done(null, {...userData}));
    passport.deserializeUser((id, done) => done(null, id));
}