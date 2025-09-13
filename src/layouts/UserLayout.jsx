import {NavBar}  from "@/components/NavBar"
import { Outlet } from "react-router-dom"

function UserLayout() {
    return (
      <div className="mx-auto w-[100vw] min-h-screen">
          <NavBar />
          <Outlet />
      </div>
    )
  }
export default UserLayout