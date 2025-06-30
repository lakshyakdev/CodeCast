import { useEffect } from 'react';
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