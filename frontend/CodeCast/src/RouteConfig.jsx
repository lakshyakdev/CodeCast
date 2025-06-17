import { Route , Routes } from "react-router-dom";
import Homepage from "./components/homepage/Homepage.jsx"
import Layout from "./components/layouts/Layout/Layout.jsx";
import NotFound from "./components/Notfound/NotFound.jsx";
import LoginPage from "./components/loginPage/loginPage.jsx";
import SignupPage from "./components/SignupPage/SignupPage.jsx";
import { PreventAuthAccess } from "./components/authGuard/authGuard.jsx";

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
            <Route path="*" element={<Layout child={<NotFound />}/>}/>
        </Routes>
    )
}