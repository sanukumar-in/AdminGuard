import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};