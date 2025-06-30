import { useDispatch, useSelector } from "react-redux";

import { viewCourse } from "../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Drawer from "../../Components/Drawer/Drawer";

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
            <p className="text-center">Loading course...</p>
            </Drawer>
        );
    }
    return(
        <>
            <Drawer>
                <img className="h-24 w-24" src={course.thumbnail.url} alt="thumbnail" />
                <h1 className="text-2xl">Title : {course.title}</h1>
                <h2>Access level : {course.accessLevel}</h2>
                <h2>Description :{course.description}</h2>
                <h2>Total number of users enrolled: {course.enrolledUsers.length}</h2>
                <h2>Total number of lessons: {course.lesson.length}</h2>
                <p>Last edited : {course.updatedAt}</p>
            </Drawer>
        </>
    )
}