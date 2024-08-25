import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout(){

    return (
        <div className="min-h-full">
            <div className="container">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}