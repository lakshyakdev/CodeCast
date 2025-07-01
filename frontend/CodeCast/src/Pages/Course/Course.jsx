import { useDispatch, useSelector } from "react-redux";

import { viewCourse } from "../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Drawer from "../../ComponentFolder/Drawer/Drawer";


export default function Course(){
    
    const dispatch =useDispatch();
    let course = useSelector((state)=>state.course.selectedCourse);
    const viewcourse = async (id)=>{
        try{
            let response = await dispatch(viewCourse(id));
            if (!response.payload?.success) {
                toast.error("Something went wrong");
            }
        }
        catch(e){
            toast.error("Something went wrong");
            console.log(e);
        }
    }
    const {id}  = useParams();
    useEffect(()=>{console.log(course);
        (async()=>{await viewcourse(id)})()}
        ,[]);

    if (!course) {
        return (
            <Drawer>
            <h1 className="text-center"><b>Loading content.....</b></h1>
                <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </Drawer>
        );
    }
    return(
        <>
        <Drawer>
        <div className="card bg-base-100 w-96 shadow-sm m-auto mt-20">
            <figure className="px-10 pt-10">
                <img
                src={course.thumbnail.url}
                alt="Course thumbnail"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h1 className="text-2xl">Title : {course.title}</h1>
                <h2>Access level : {course.accessLevel}</h2>
                <h2>Description :{course.description}</h2>
                <h2>Total number of users enrolled: {course.enrolledUsers.length}</h2>
                <h2>Total number of lessons: {course.lesson.length}</h2>
                <p>Last edited : {course.updatedAt}</p>
            </div>
        </div>
        </Drawer>
        </>
    )
}