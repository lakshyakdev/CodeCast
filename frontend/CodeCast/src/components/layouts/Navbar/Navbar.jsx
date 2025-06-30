import { useDispatch, useSelector } from "react-redux"
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
export default function Navbar(){
    const dispatch = useDispatch();
    const navigation = useNavigate();
    async function logoutUser() {
        try{
        const response = await dispatch(logout());
            if(response.payload.success){
            navigation("/");
            toast.success("Successfully logout");
            }
        }
        catch(e){
            toast.error("Unexpected Error");
        }
    }
    let isloggedin = useSelector((state)=> state?.auth?.isloggedin);
    let UserProfileURL = useSelector((state)=> state?.auth?.avatarUrl);
    return(
        <>
            <div className="navbar bg-base-100 shadow-sm" data-theme="dark" >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/">Homepage</Link></li>
                            <li><Link>Portfolio</Link></li>
                            <li><Link>About</Link></li>
                             {!isloggedin && (
                                <>
                                    <li className="md:hidden"><Link to="/login">Login</Link></li>
                                    <li className="md:hidden"><Link to="/signup">Signup</Link></li>
                                </>
                             )}
                        </ul>
                    </div>
                </div>
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to="/"><b>CodeCast</b></Link>
            </div>
            <div className="right-icons">
                {isloggedin && ( 
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Profile"
                                src={UserProfileURL} />
                         </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><Link onClick={logoutUser}>Logout</Link></li>
                    </ul>
                </div>
            )}
            {!isloggedin && (
                    <div className="hidden md:flex space-x-2">
                    <Link to="/login" className="btn authButtons">Login</Link>
                    <Link to="/signup" className="btn authButtons">Signup</Link>
                </div>
            )}
        </div>
        </div>
    </>
    )
}
