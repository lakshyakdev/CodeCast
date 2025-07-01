import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function PreventAuthAccess({ children }) {
    const navigate = useNavigate();
    const { isloggedin, loginTimestamp } = useSelector((state) => state.auth);

    useEffect(() => {
    if (isloggedin) {
        const isRecentLogin = loginTimestamp && (Date.now() - loginTimestamp < 2000);
        if (!isRecentLogin) {
            toast.error("User already logged in");
        }
        navigate("/", { replace: true });
    }
    }, [isloggedin, navigate]);

    if (isloggedin) {
        return null;
    }

    return children;
}

export function RequireAuth({ children }) {
    const navigate = useNavigate();
    const { isloggedin } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isloggedin) {
            toast.error("Please login to access this page");
            setTimeout(() => {
            navigate("/", { replace: true });
        }, 100);
        }
    }, [isloggedin, navigate]);

    if (!isloggedin) {
        return null; 
    }
    return children;
}

export function RequireAuthAdmin({ children }) {
    const navigate = useNavigate();
    const { isloggedin, role } = useSelector((state) => state.auth);
    const [delayedCheck, setDelayedCheck] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedCheck(true);
        }, 500); 

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!delayedCheck) return;

        if (!isloggedin) {
            toast.error("Please login to access this page");
            navigate("/", { replace: true });
        } else if (role === "USER") {
            toast.error("Only Admin or Faculty can access this page, contact support");
            navigate("/", { replace: true });
        }
    }, [delayedCheck, isloggedin, role, navigate]);

    if (!delayedCheck) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!isloggedin || role === "USER") {
        return null;
    }

    return children;
}