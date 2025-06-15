import {Schema,model} from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        lowercase: true,
        minLength : [5,"Username must be atleast 5 letters"],
        maxLength: [50, "Username is too long"],
    },
    email : {
        type : String,
        required : [true,"email is required"],
        unique : true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,"please fill vaild email address"],
        maxLength: [80, "Email is too long"],
    },
    password :{
        type : String,
        required : true,
        select : false,
        minLength : [8,"Password must be minimum 8 characters long"],
    },
    avatar : {
        publicId :{
            type : String,
        },
        url :{
            type : String,
        }
    },
    role :{
        type : String,
        enum : ["USER",'MODERATOR','ADMIN'],
        default : "USER",
    },
    forgotPasswordToken : String,
    forgotPasswordToken : Date,
},
{
    timestamps:true,
});

userSchema.pre("save",async function (next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,25)
});

userSchema.methods.generateJWTtoken = function(){
    return jwt.sign({
        username: this.username,
        id: this._id,
        email: this.email,
        subscriptions: this.subscriptions,
        role: this.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRY,
    });
};

userSchema.methods.checkPass = async function(plainTextPass){
    return await bcrypt.compare(plainTextPass, this.password);
};

const User = model("User",userSchema);

export default User;