import { adminSidebarMenu } from "@/utils/data/adminSidebarMenu";
import { IoMdHome } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

function AdminSidebar() {
  const location = useLocation();
  const { state } = useAuth();


  return (
    <aside className="sm:h-full flex flex-row sm:flex-col py-4 sm:px-4 overflow-x-auto scrollbar-hide sm:pt-20">
      {/* Mobile layout - like UserSideBar (sm: and down) */}
      <nav className="flex flex-row sm:hidden gap-2 items-center">
        {adminSidebarMenu.map((Item, index) => (
          <Link
            key={index}
            to={Item.link}
            className={`flex items-center px-4 py-2 cursor-pointer transition-colors hover:bg-gray-100 rounded ${
              location.pathname === Item.link ? "bg-gray-200" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Item.icon className="h-5 w-5" />
              <span className="truncate whitespace-nowrap">{Item.name}</span>
            </div>
          </Link>
        ))}
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
        >
          <IoMdHome className="mr-2 h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
        >
          <IoLogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </Link>
      </nav>

      {/* Desktop layout - like UserSideBar (sm: and up) */}
      <nav className="hidden sm:flex sm:flex-col w-full gap-5 justify-between sm:h-full">
        <h1 className="text-xl font-semibold text-center text-orange-400">Admin Panel</h1>
        <div className="hidden sm:flex justify-center items-center gap-2">
          <img
            src={state.user.profilePic}
            alt=""
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
          />
          <p className="text-sm font-medium">{state.user.username}</p>
        </div>

        <div className="w-full flex flex-row sm:flex-col sm:justify-between sm:h-full">
          <div className="flex flex-row sm:flex-col sm:gap-2">
            {adminSidebarMenu.map((Item, index) => (
              <Link
                key={index}
                to={Item.link}
                className={`w-full flex items-center gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-gray-200 ${
                  location.pathname === Item.link
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                <Item.icon className="h-5 w-5" />
                <span className="flex-1">{Item.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-row sm:flex-col">
            <Link
              to="/"
              className="w-full flex items-center gap-2 p-2 text-gray-600 rounded hover:bg-gray-200"
            >
              <IoMdHome className="h-5 w-5" />
              <span className="flex-1">Home page</span>
            </Link>
            <Link
              to="/"
              className="w-full flex items-center gap-2 p-2 text-gray-600 rounded hover:bg-gray-200"
            >
              <IoLogOut className="h-5 w-5" />
              <span className="flex-1">Log out</span>
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}
export default AdminSidebar;
