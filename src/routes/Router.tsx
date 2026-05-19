import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "@/components/Loading";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import DashboardPage from "@/pages/DashboardPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const DashBoardLayout = lazy(() => import("../layouts/DashBoardLayout"));
const UserPage = lazy(() => import("../pages/UserPage"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          
          <Route element={<MainLayout />}>
          {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<DashBoardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/categories" element={<CategoryPage />} />
            <Route path="/admin/users" element={<UserPage />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found!</h1>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
