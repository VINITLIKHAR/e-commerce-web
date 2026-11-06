import { Routes, Route, Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AppRoutes = () => (
  <Routes>

    <Route path="/login" element={<Login />} />


    <Route element={<MainLayout />}>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="py-20 text-center">
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
              Go back home
            </Link>
          </div>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;