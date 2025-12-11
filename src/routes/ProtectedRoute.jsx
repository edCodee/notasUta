import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <div className="p-10 text-center">Cargando permisos...</div>;


    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }


    
    const userRoles = user.roles || [];
    
    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (!hasPermission) {

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};