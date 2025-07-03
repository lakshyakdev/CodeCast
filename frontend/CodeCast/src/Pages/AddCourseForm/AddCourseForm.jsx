import "./AddCourseForm.css"
import { Link, useNavigate } from "react-router-dom"
import { BsFillFileImageFill } from "react-icons/bs";
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/slices/authSlice";
import { createCourse } from "../../redux/slices/courseSlice";
export default function SignupPage(){
    let [inputImg, setinputImg] = useState("");
    let [inputData, setinputData] = useState({
        thumbnail : "",
        title : "",
        description : "",
        accessLevel : "FREE",
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
                thumbnail : uploadImage,
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
        console.log(inputData.accessLevel);
        if(!inputData.title || !inputData.description || !inputData.accessLevel){
            return toast.error("All fields are required");
        }
        if(inputData.title.length<5){
            return toast.error("Username must be 5 characters long");
        }
        let fileData = new FormData();
        fileData.append("title" , inputData.title);
        fileData.append("description" , inputData.description);
        fileData.append("accessLevel" , inputData.accessLevel);
        if(inputData.thumbnail){
            fileData.append("thumbnail" , inputData.thumbnail);
        }
        const loadingToast = toast.loading("Connecting with database... , Please wait");
        try{
            const response = await dispatch(createCourse(fileData));
            toast.dismiss(loadingToast);
            if(response.type === '/course/create/fulfilled' && response.payload.success){
                navigate("/");
                toast.success("Successfully regsitered");
                setinputData({
                thumbnail : "",
                title : "",
                description : "",
                accessLevel : "FREE",
                })
                setinputImg("");
            }
            else if (response.type === '/course/create/rejected') {
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
        <>
            <h1 className="text-center bg-base-200 flex-col pt-10"><b className="btn h-20 border-violet-900 border-5 text-5xl bg-black text-white rounded-4xl p-4">Add Course</b></h1>
            <div className="hero bg-base-200 flex-grow">
                <form onSubmit={(e)=>createAccountFn(e)}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body text-color">
                        <fieldset className="fieldset">
                        <label className="label text-xl font-bold">Course Thumbnail</label>
                        <div>
                            <label htmlFor="image_upload" className="cursor-pointer">
                                {inputImg ? (
                                    <img src={inputImg} alt="prevImg" className="h-60 w-60 m-auto" />
                                ):(
                                <BsFillFileImageFill  className="h-60 w-80 m-auto" />
                                )}
                        </label>
                        <input type="file" name="thumbnail" id="image_upload" onChange={(e)=>imageUpload(e)} class="file-input"/>
                        </div>
                        <label className="label text-xl font-bold">Course Title</label>
                        <input type="text" name="title" className="input" placeholder="title" value={inputData.title} onChange={(e)=>onInput(e)}required />
                        <label className="label text-xl font-bold">Course Description</label>
                        <input type="text" name="description" className="input" placeholder="description" value={inputData.description} onChange={(e)=>onInput(e)} required/>
                        <label className="label text-xl font-bold">Access Level</label>
                        <select defaultValue="Select" className="select" name="accessLevel" value={inputData.accessLevel} onChange={(e)=>onInput(e)} required>
                            <option disabled={true}>Select</option>
                            <option>FREE</option>
                            <option>BASIC</option>
                            <option>PREMIUM</option>
                        </select>
                        <button type="submit" className="btn Loginbtn btn-neutral mt-4">Add Course</button>
                        </fieldset>
                        </div>
                    </div>
                </div>
            </form>    
        </div>
        </>
    )
}