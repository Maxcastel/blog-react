import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout(){

    return (
        <div className="min-h-full">
            <div className="container">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}