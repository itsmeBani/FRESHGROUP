import {type ReactNode,} from 'react';
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";
import LoadingPage from "@/pages/LoadingPage.tsx";


interface ProtectedComponentProps {
    children: ReactNode;
}


function ProtectedRoute({ children }: ProtectedComponentProps) {
    const {user}=useAuth()
    if (user === undefined) return <LoadingPage/>

    if (user === null || user.role === undefined ) return <Navigate to="/login" replace />;

    if (user && user.role)  return children
}

export default ProtectedRoute;
