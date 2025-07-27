import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'


import './styles.css'
import {ThemeProvider} from "@/contexts/ThemeProvider.tsx";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {AuthContextProvider, } from "@/contexts/AuthContext.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from './pages/Layout';
import Dashboard from "@/pages/Dashboard.tsx";
import StudentPage from "@/pages/StudentPage.tsx";
import Login from "@/components/authentication-component/Login.tsx";
import ForgotPassword from "@/components/authentication-component/ForgotPassword.tsx";
import ProtectedRoute from "@/components/authentication-component/ProtectedRoutes.tsx";
import PublicRoute from "@/components/authentication-component/PublicRoute.tsx";
import {Outlet} from "react-router-dom";
import CreateNewPassword from "@/components/authentication-component/CreateNewPassword.tsx";
import Signup from "@/components/authentication-component/Signup.tsx";
import PermissionPage from "@/pages/Permissions.tsx";
import Playground from "@/pages/Playground.tsx";
import Cluster from "@/pages/Cluster.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";



const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    const queryClient = new QueryClient()
    const router = createBrowserRouter([
        {
            path: "/",
            element:<ProtectedRoute ><Layout/></ProtectedRoute>,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "students",
                    element:<StudentPage/>,
                },
                {
                    path: "permission",
                    element:<PermissionPage/>,
                },
                {
                    path: "playground",
                    element:<Playground/>,
                },
                {
                    path: "cluster-profile",
                    element:<Cluster/>,
                },
            ],
            errorElement:<NotFoundPage/>,
        },
        {
            path: "/login",
            element:<PublicRoute ><Login/></PublicRoute>,
        },
        {
            path: "/sign-in",
            element:<PublicRoute ><Signup/></PublicRoute>,
        },
        {
            path: "/forgot-password",
            element:<PublicRoute><Outlet/></PublicRoute>,
            children:[
                { path: "",
                element: <ForgotPassword/>,
                },
                { path: "new-password",
                    element: <CreateNewPassword/>,
                }


            ]
        },
    ]);
    root.render(
        <StrictMode>

            < QueryClientProvider client={queryClient} >
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    <AuthContextProvider>
                        <RouterProvider    router={router}/>
                        <Toaster theme={"dark"} position="top-right" richColors={true} />
                    </AuthContextProvider>

                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>,
    )
}
