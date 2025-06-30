import { Route , Routes } from "react-router-dom";
import Homepage from "./Pages/homepage/Homepage.jsx";


import LoginPage from "./Pages/loginPage/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage/SignupPage.jsx";
import AllCourses from "./Pages/Allcourses/AllCourses.jsx";
import Course from "./Pages/Course/Course.jsx";
import ViewProfile from "./Pages/ViewProfile/ViewProfile.jsx";
import NotFound from "./Pages/Notfound/NotFound.jsx";
import Layout from "./ComponentFolder/layouts/Layout/Layout.jsx";
import { PreventAuthAccess } from "./ComponentFolder/authGuard/authGuard.jsx";


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Layout child={<Homepage />} />} />
            <Route path="/login" element={
                <PreventAuthAccess >
                <Layout child={<LoginPage />}/>
                </PreventAuthAccess>} />
            <Route path="/signup" element={
                <PreventAuthAccess >
                <Layout child={<SignupPage />}/>
                </PreventAuthAccess> } />
            <Route path="/courses" element= {<AllCourses />} />
            <Route path="/course/:id" element={<Course />}></Route>
            <Route path="/profile" element={<Layout child={<ViewProfile />}/>}></Route>
            <Route path="*" element={<Layout child={<NotFound />}/>}/>
        </Routes>
    )
}