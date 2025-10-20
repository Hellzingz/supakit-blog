import React from "react";
import Logo from "../assets/img/logo.png";
import { useToggle } from "../hooks/useToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import NavbarProfile from "./NavbarProfile";
import NavbarDropdown from "./NavbarDropdown";
import { useAuth } from "@/context/authContext";

export function NavBar() {
  const { toggle, changeToggle } = useToggle(false);
  const { state } = useAuth();
  const isAuthenticated = Boolean(state?.user);

  return (
    <div className="w-full bg-white sm:border-b border-gray-200 py-4 sm:px-10 md:px-20">
      <nav className="w-full flex flex-col sm:flex-row items-center justify-between px-5">
        <div className="w-full flex items-center justify-between">
          <div className="w-full border-b border-gray-200 sm:border-none">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="flex-1 hidden sm:flex items-center justify-end gap-2">
            {isAuthenticated ? (
              <NavbarProfile openMenu={changeToggle}/>
            ) : (
              <div className="flex items-center gap-4 px-6">
                <Link
                  to="/login"
                  className="nav-button-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-button-dark whitespace-nowrap"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div
            className="block sm:hidden cursor-pointer"
            onClick={changeToggle}
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="w-full bg-white sm:absolute sm:max-w-[210px] sm:border sm:border-gray-200 sm:shadow-md sm:rounded-md sm:top-18 sm:right-30">
          <NavbarDropdown isAuthenticated={isAuthenticated} state={state} />
        </div>
      )}
      {toggle && !isAuthenticated && (
        <div className="flex sm:hidden flex-col gap-4 px-6 py-10">
          <Link
            to="/login"
            className="nav-button-mobile-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="nav-button-mobile-dark"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
