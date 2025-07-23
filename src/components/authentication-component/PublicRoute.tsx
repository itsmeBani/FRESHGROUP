import type {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.tsx";

interface PublicRouteProps {
    children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const {user}=useAuth()
       if (user === undefined) return  <p>loading</p>
    if (user && user.role) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
