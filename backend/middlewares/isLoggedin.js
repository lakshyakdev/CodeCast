import ExpressError from "../utils/ExpressError"
import jwt from "jsonwebtoken";

const isLoggedin = async function(){
    let {token} = req.cookie;
    if(!token){
        return next(ExpressError(400,"Unauthenticated ,User not logged in"));
    }
    let userDetails = await jwt.verify(token , process.env.JWT_SECRET);
    req.user = userDetails;
    next();
}

export default isLoggedin;