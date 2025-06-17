import ExpressError from "../utils/ExpressError.js"
import jwt from "jsonwebtoken";

const isLoggedin = async function(req,res,next){
    try{
        let {token} = req.cookies;
        if(!token){
            return next(new ExpressError(400,"Unauthenticated ,User not logged in"));
        }
        let userDetails = await jwt.verify(token , process.env.JWT_SECRET);
        req.user = userDetails;
        next();
    }
    catch(e){
        return next(new ExpressError(400,e));
    }
}

export default isLoggedin;