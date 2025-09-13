import Footer from "@/components/Footer"
import {NavBar}  from "@/components/NavBar"
import { Outlet } from "react-router-dom"

function DefaultLayout() {
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col justify-between">
        <NavBar />
        <Outlet />
        <Footer/>
    </div>
  )
}
export default DefaultLayout