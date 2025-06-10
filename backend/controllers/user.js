import User from "../models/user";
import cookieOptions from "../utils/cookieOptions";
import ExpressError from "../utils/ExpressError";



const register = async (req,res,next)=>{
    let {username , email, password} = req.body;
    if(!username){
        return next(ExpressError(400, "Username is required"));
    }
    if(!email){
        return next(ExpressError(400, "email is required"));
    }
    if(!password){
        return next(ExpressError(400, "password is required"));
    }

    if((await User.findOne({email:email}))){
        return next(ExpressError(500, "Email already registered"));
    }

    let user = await User.create({
        username,
        email,
        password,
    });

    if(!user){
        return next(ExpressError(500, "Something went wrong while registering user"));
    }

    await user.save();

    user.password = undefined;

    let token = user.generateJWTtoken();
    res.cookie('token',token,cookieOptions);
    
    res.json({
        success: true,
        message : "User registered successfully",
        user,
    })
}

const loginUser = async (req,res,next)=>{
    let {email, password} = req.body;
    if(!email){
        return next(ExpressError(400, "email is required"));
    }
    if(!password){
        return next(ExpressError(400, "password is required"));
    }

    let user = await User.findOne({email:email}).select("+password");

    if(!user){
        return next(ExpressError(400, "User not found"));
    }

    if(!(await user.checkPass(password))){
        return next(ExpressError(400, "Password is incorrect"));
    }

    user.password = undefined;

    let token = user.generateJWTtoken();
    res.cookie("token",token,cookieOptions);

    res.json({
        success:true,
        message : "User login successfully",
        user,
    })
}

const logout = async (req,res,next)=>{
    try{
        let id = req.user;
        let user = await User.findById(id);
        if(!user){
            return next(ExpressError(400, "Invalid id pls login again"));
        }
        res.cookie("token",null ,{
            maxAge : 0,
            expires : 0,
        });
    
        res.json({
            success : true,
            message : "User logout successfully",
            user,
        })
    } catch{
        return next(ExpressError(500, "Something went wrong during logout"));
    }
}

export {
    register,
    loginUser,
    logout,
}