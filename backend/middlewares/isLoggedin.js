import ExpressError from "../utils/ExpressError"

const isLoggedin = function(){
    if(!req.cookie.id){
        return next(ExpressError(400,"User not logged in"));
    }
    req.user = req.cookie;
    next();
}