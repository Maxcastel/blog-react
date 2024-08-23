import { Outlet } from "react-router-dom";
import { HeaderAdmin } from "./HeaderAdmin";

export function LayoutAdmin(){

    return (
        <div className="min-h-full">
            <div className="container">
                <HeaderAdmin />
                <Outlet />
            </div>
        </div>
    )
}