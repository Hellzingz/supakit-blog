import { NavBar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";
import UserSideBar from "@/components/UserSideBar";
function UserLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <NavBar />
      <div className="w-full max-w-[1440px] mx-auto flex justify-center items-start px-0 sm:px-4">
        <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-0 sm:gap-4">
          <div className="w-full sm:w-auto sm:mt-10">
            <UserSideBar />
          </div>
          <div className="w-full mt-4 sm:mt-10 sm:max-w-xl">
            <Outlet />
          </div>
        </div>
      </div>
      </div>
    )
  }
export default UserLayout
