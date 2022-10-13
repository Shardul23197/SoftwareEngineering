import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthProvider } from "../hooks/AuthProvider";

const ProtectedRoute = ({ children }) => {
    AuthProvider.login()
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;