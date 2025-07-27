import type {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx";
import LoadingPage from "@/pages/LoadingPage.tsx";

interface PublicRouteProps {
    children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const {user}=useAuth()
       if (user === undefined) return  <LoadingPage/>
    if (user && user.role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
