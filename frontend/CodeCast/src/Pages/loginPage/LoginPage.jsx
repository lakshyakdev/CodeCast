import { Link, useNavigate } from "react-router-dom"
import "./LoginPage.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function LoginPage() {
    let [inputData, setinputData] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function onInput(event) {
        let { name, value } = event.target;
        setinputData({ ...inputData, [name]: value });
    }

    async function loginAccount(e) {
        e.preventDefault();
        
        if (!inputData.email || !inputData.password) {
            return toast.error("All fields are required");
        }
        const loadingToast = toast.loading("Authenticating user, please wait...");
        try {
            const response = await dispatch(login(inputData));
            toast.dismiss(loadingToast);
            if (response.type === '/auth/login/fulfilled' && response.payload?.success) {
                    toast.success(response.payload?.message || "Successfully logged in");
                    setinputData({
                        email: "",
                        password: "",
                    });
                    navigate("/");
            }
            else if (response.type === '/auth/login/rejected') {
                toast.error(response.payload || "Login failed");
            } else {
                toast.error("Login failed - unexpected response");
            }
        } catch (e) {
            toast.dismiss(loadingToast);
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <div className="hero bg-base-200 flex-grow">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center text-color lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Welcome back to CodeCast — your gateway to mastering coding skills and building real-world projects. Sign in to access your personalized dashboard, track your course progress, and continue your learning journey with expert-led tutorials and interactive challenges. Your next coding breakthrough is just a login away.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body text-color">
                        <form onSubmit={(e) => loginAccount(e)}>
                            <fieldset className="fieldset">
                                <label className="label text-xl font-bold">Email</label>
                                <input 
                                    name="email" 
                                    value={inputData.email} 
                                    onChange={onInput} 
                                    type="email" 
                                    className="input" 
                                    placeholder="Email" 
                                />
                                <label className="label text-xl font-bold">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="input" 
                                    placeholder="Password" 
                                    value={inputData.password} 
                                    onChange={onInput} 
                                />
                                <div>
                                    <Link className="link link-hover text-base font-bold link-custom">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <span className="font-bold text-base">New to CodeCast </span>
                                    <Link to="/signup" className="link link-hover text-base link-custom font-bold">
                                        Signup
                                    </Link>
                                </div>
                                <button type="submit" className="btn Loginbtn btn-neutral mt-4">
                                    Login
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}