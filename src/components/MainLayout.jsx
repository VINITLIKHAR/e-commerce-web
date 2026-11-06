import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const MainLayout = () => (
    <div className="flex main-h-screen flex-col bg-gray-50">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
        </main>

        <Footer />

    </div>
);

export default MainLayout;