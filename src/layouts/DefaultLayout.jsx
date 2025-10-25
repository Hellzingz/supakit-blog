import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="w-full max-w-[1600px]  sm:mt-10 mx-auto flex justify-center items-start px-0 sm:px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
