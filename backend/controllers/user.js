import User from "../models/user.js";
import cookieOptions from "../utils/cookieOptions.js";
import ExpressError from "../utils/ExpressError.js";



const register = async (req,res,next)=>{
    let {username , email, password} = req.body;
    if(!username){
        return next(new ExpressError(400, "Username is required"));
    }
    if(!email){
        return next(new ExpressError(400, "email is required"));
    }
    if(!password){
        return next(new ExpressError(400, "password is required"));
    }

    if((await User.findOne({email:email}))){
        return next(new ExpressError(500, "Email already registered"));
    }

    let url = "https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let publicId = "deafult avatar";

    if(req.file){
            url = req.file.path;
            publicId = req.file.filename;
        }

    let user = await User.create({
        username,
        email,
        password,
        avatar : {
                url,
                publicId,
            },
        subscriptions : {
            plan : "FREE",
            status : "ACTIVE",
            startDate : Date.now(),
        }
    });

    if(!user){
        return next(new ExpressError(500, "Something went wrong while registering user"));
    }

    await user.save();

    user.password = undefined;

    let token = user.generateJWTtoken();
    res.cookie('token',token,cookieOptions);
    
    res.status(200).json({
        success: true,
        message : "User registered successfully",
        user,
    })
}

const loginUser = async (req,res,next)=>{
    let {email, password} = req.body;
    if(!email){
        return next(new ExpressError(400, "email is required"));
    }
    if(!password){
        return next(new ExpressError(400, "password is required"));
    }

    let user = await User.findOne({email:email}).select("+password");

    if(!user){
        return next(new ExpressError(400, "User not found"));
    }

    if(!(await user.checkPass(password))){
        return next(new ExpressError(400, "Password is incorrect"));
    }

    user.password = undefined;

    let token = user.generateJWTtoken();
    res.cookie("token",token,cookieOptions);

    res.status(200).json({
        success:true,
        message : "User login successfully",
        user,
    })
}

const logout = async (req,res,next)=>{
    try{
        res.cookie("token",null ,{
            maxAge : 0,
            expires : 0,
            secure : true,
            httpOnly : true,
        });
    
        res.status(200).json({
            success : true,
            message : "User logout successfully",
        })
    } catch(e){
        return next(new ExpressError(500, "Something went wrong during logout"));
    }
}

const userProfile = async (req,res)=>{
    try{
        let id = req.user;
        let user = await User.findById(id);
        if(!user){
            return next(new ExpressError(400, "Invalid id pls login again"));
        }
    
        res.status(200).json({
            success : true,
            message : "User profile fetched",
            user,
        })
    } catch(e){
        return next(new ExpressError(500, "Something went wrong",e));
    }
}

const adminRegister = async (req,res,next)=>{
    let {username , email, password} = req.body;
    let {id} = req.params;
    if(id === process.env.adminKey){        
        if(!username){
            return next(new ExpressError(400, "Username is required"));
        }
        if(!email){
            return next(new ExpressError(400, "email is required"));
        }
        if(!password){
            return next(new ExpressError(400, "password is required"));
        }

        if((await User.findOne({email:email}))){
            return next(new ExpressError(500, "Email already registered"));
        }
        let url = "https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        let publicId = "deafult avatar";
        if(req.file){
            url = req.file.path;
            publicId = req.file.filename;
        }
        
        let user = await User.create({
            username,
            email,
            password,
            role : "ADMIN",
            avatar : {
                url,
                publicId,
            },
            subscriptions : {
                plan : "PREMIUM",
                status : "ACTIVE",
                startDate : Date.now(),
            },
        });

        if(!user){
            return next(new ExpressError(500, "Something went wrong while registering user"));
        }

        await user.save();

        user.password = undefined;

        let token = user.generateJWTtoken();
        res.cookie('token',token,cookieOptions);
        
        return res.status(200).json({
            success: true,
            message : "User registered successfully",
            user,
        })
    }
    else{
        return next(new ExpressError(401,"You dont have permission for admin register"));
    }

}

export {
    register,
    loginUser,
    logout,
    userProfile,
    adminRegister,
}