import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main className="layout-container">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout;