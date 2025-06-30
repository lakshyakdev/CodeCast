import { useState } from "react";
import { Link } from "react-router-dom";

import "./Drawer.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import Footer from "../layouts/Footer";
export default function Drawer({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  async function handleLogout () {
        try {
            const response = await dispatch(logout());
            if (response.payload?.success) {
              toast.success("Successfully logout");
            }
        } catch (e) {
          console.log(e);
          toast.error("An unexpected error occurred, Please login again");
        }
  }

  let isloggedin = useSelector((state)=> state?.auth?.isloggedin);
  let UserProfileURL = useSelector((state)=> state?.auth?.avatarUrl);
  let role = useSelector((state)=> state?.auth?.role);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Layout Container */}
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <aside className={`w-64 bg-base-200 fixed inset-y-0 left-0 z-50 transform transition-transform lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4">
            {/* Logo */}
            <div className="mb-6 pb-4">
              <Link 
                to="/" 
                className="btn text-3xl font-bold text-primary logo-btn"
                onClick={() => setIsOpen(false)}
              >
                CodeCast
              </Link>
            </div>
            
            {/* Navigation Menu */}
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/dashboard" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                {isloggedin &&
                (<li>
                  <Link 
                    to="/profile" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>)
                }
                {isloggedin && role === "ADMIN" &&
                (<li>
                  <Link 
                    to="/profile" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </li>)
                }
                {isloggedin && role === "ADMIN" &&
                (<li>
                  <Link 
                    to="/courses" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={async () => {setIsOpen(false);await handleLogout ()}}
                  >
                    Logout
                  </Link>
                </li>)
                }
                {!isloggedin &&
                (<li>
                  <Link 
                    to="/login" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>)}
                {!isloggedin &&
                (<li>
                  <Link 
                    to="/signup" 
                    className="block p-3 rounded-lg hover:bg-base-300 transition-colors menu-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </Link>
                </li>)
                }
              </ul>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile - semi-transparent */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col lg:ml-0">
          {/* Header with hamburger menu */}
          <header className="bg-base-100 p-4 border-b border-base-300 lg:hidden">
            <button 
              className="btn btn-square btn-ghost"
              onClick={toggleDrawer}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4">
            {children}
          </div>
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}