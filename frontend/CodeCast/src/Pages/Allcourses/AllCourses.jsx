
import Card from "./Card/Card"
import { useDispatch} from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import toast from "react-hot-toast";
import { useState,useEffect } from "react";
import "./AllCourses.css"
import Drawer from "../../ComponentFolder/Drawer/Drawer";


export default function AllCourses(){
    const [courses , setcourses] = useState([]);
    const dispatch = useDispatch();
    async function FetchAllCourses(){
        const response = await dispatch(getAllCourses());
        if (response.type === '/courses/fulfilled' && response.payload?.success) {
            setcourses(response.payload?.allCourses);
            console.log("Success");
        } 
        else if (response.type === '/courses/rejected') {
            toast.error(response.payload || "Login failed");
        } else {
            toast.error("Login failed - unexpected response");
        }
    }

    useEffect(() => {
    (async () => {
      await FetchAllCourses();
    })();
  }, []);


    return (
        <>
        <div className="min-h-screen bg-base-200 flex flex-col bg-gray-50">
            <Drawer>
                <div className="flex-1">
                <h1 className="text-4xl font-bold p-4 rounded-lg text-center mb-10">
                    <i>All Courses</i>
                </h1>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
                    {courses.map((course) => (
                    <Card
                        key={course._id}
                        thumbnail={course.thumbnail.url}
                        title={course.title}
                        des={course.description}
                        courseid = {course._id}
                    />
                    ))}
                </div> 
                </div>
            </Drawer>
        </div>
        </>
        )
}