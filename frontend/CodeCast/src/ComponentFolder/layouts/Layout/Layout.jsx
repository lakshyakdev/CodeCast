import Navbar from "../Navbar/Navbar"
import Footer from "../Footer"
import "./Layout.css"
export default function Layout ({child}){
    return(
        <div className="Display-Wrapper">
            <Navbar />
            <div className="MainContent">
                {child}
            </div>   
            <Footer /> 
        </div>
    )   
}