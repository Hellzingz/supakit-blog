import React from "react";
import Logo from "../assets/img/logo.png";
import { useToggle } from "../hooks/useToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import NavDropdown from "./NavDropdown";

export function NavBar() {
  const { toggle, changeToggle } = useToggle(false);
  const { isAuthenticated } = useAuth();



  return (
    <div className="bg-[#F9F8F6]">
      <nav className="container mx-auto w-full h-[80px] flex items-center justify-between px-5 py-10">
        <div>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <GiHamburgerMenu
          className="block sm:hidden cursor-pointer"
          size={20}
          onClick={changeToggle}
        />

        <div className="hidden sm:flex space-x-4">
          {isAuthenticated ? (
            <NavDropdown />
          ) : (
            <>
              <Link
                to="/login"
                className="px-8 py-2 rounded-full border border-[##75716B] cursor-pointer hover:bg-black hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-2 rounded-full border border-[##75716B] cursor-pointer hover:bg-black hover:text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      {toggle && (
        <div className="flex flex-col sm:hidden items-center w-full gap-5 shadow-xl py-10">
          <Link
            to="/login"
            className=" w-full text-center py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className=" w-full text-center py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
