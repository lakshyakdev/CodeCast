import "./SignupPage.css"
import { Link, useNavigate } from "react-router-dom"
import {BsPersonCircle} from "react-icons/bs"
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/slices/authSlice";
export default function SignupPage(){
    let [inputImg, setinputImg] = useState("");
    let [inputData, setinputData] = useState({
        avatar : "",
        username : "",
        email : "",
        password : "",
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function onInput(event) {
        let {name , value} = event.target;
        setinputData({...inputData, [name] : value});
    }

    function imageUpload(event){
        event.preventDefault();;
        const uploadImage = event.target.files[0];
        if(uploadImage){
            setinputData({
                ...inputData,
                avatar : uploadImage,
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener("load", () => {
                setinputImg(fileReader.result);
            });
        }
    }

    async function createAccountFn(e){
        e.preventDefault();
        if(!inputData.email || !inputData.password || !inputData.username){
            return toast.error("All fields are required");
        }
        if(!inputData.email.match(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)){
            return toast.error("please enter valid email");
        }
        if(!inputData.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/)){
            return toast.error("Password must be 8 characters long must conatin \n password contains at least one lowercase letter\n password contains at least one uppercase letter. \n  password contains at least one special character\n password does not contain any whitespace characters");
        }
        if(inputData.username.length<5){
            return toast.error("Username must be 5 characters long");
        }
        let fileData = new FormData();
        fileData.append("username" , inputData.username);
        fileData.append("email" , inputData.email);
        fileData.append("password" , inputData.password);
        if(inputData.avatar){
            fileData.append("avatar" , inputData.avatar);
        }
        const loadingToast = toast.loading("Authenticating user, please wait...");
        try{
            const response = await dispatch(createAccount(fileData));
            toast.dismiss(loadingToast);
            if(response.type === '/auth/login/fulfilled' && response.payload.success){
                navigate("/");
                toast.success("Successfully regsitered");
                setinputData({
                avatar : "",
                username : "",
                email : "",
                password : "",
                })
                setinputImg("");
            }
            else if (response.type === '/auth/login/rejected') {
                toast.error(response.payload || "Registration failed");
            }
            else {
                toast.error("Registration failed - unexpected response");
            }
        }
        catch(e){
            toast.dismiss(loadingToast);
            toast.error("An unexpected error occurred");
        }
    }  

    return(
            <div className="hero bg-base-200 flex-grow">
                <form onSubmit={(e)=>createAccountFn(e)}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center text-color lg:text-left">
                    <h1 className="text-5xl font-bold">Welcome to CodeCast!</h1>
                    <p className="py-6">
                    Join CodeCast today and unlock a world of coding knowledge! <br />
                        Whether you're just starting out or looking to level up your skills, CodeCast offers a wide range of curated courses and lessons tailored for every learner. Sign up now to track your progress, access exclusive content, and become part of a growing community of passionate developers.
                    </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body text-color">
                        <fieldset className="fieldset">
                        <div>
                            <label htmlFor="image_upload" className="cursor-pointer">
                                {inputImg ? (
                                    <img src={inputImg} alt="prevImg" className="h-24 w-24 rounded-full m-auto" />
                                ):(
                                <BsPersonCircle className="h-24 w-24 rounded-full m-auto" />
                                )}
                        </label>
                        <input type="file" name="avatar" id="image_upload" onChange={(e)=>imageUpload(e)} className="hidden"/>
                        </div>
                        <label className="label text-xl font-bold">Username</label>
                        <input type="text" name="username" className="input" placeholder="Username" value={inputData.username} onChange={(e)=>onInput(e)}required />
                        <label className="label text-xl font-bold">Email</label>
                        <input type="email" name="email" className="input" placeholder="Email" value={inputData.email} onChange={(e)=>onInput(e)} required/>
                        <label className="label text-xl font-bold">Password</label>
                        <input type="password" name="password" className="input" placeholder="Password" value={inputData.password} onChange={(e)=>onInput(e)} required/>
                        <div><span className="font-bold text-base">Already a user </span><Link to="/login" className="link link-hover text-base link-custom font-bold">Login</Link></div>
                        <button type="submit" className="btn Loginbtn btn-neutral mt-4">SignUp</button>
                        </fieldset>
                        </div>
                    </div>
                </div>
            </form>    
        </div>
    )
}