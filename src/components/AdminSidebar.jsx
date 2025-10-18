import { ImProfile } from "react-icons/im";
import { MdArticle,MdLockReset,MdCategory } from "react-icons/md";
import { IoMdHome,IoIosNotifications  } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

function AdminSidebar() {

  const location = useLocation();
  const {state} = useAuth()
  

  const menu = [
    { name: "Article management", link: "/admin/articles", icon: MdArticle },
    { name: "Category management", link: "/admin/category", icon: MdCategory },
    { name: "Profile", link: "/admin/profile", icon: ImProfile },
    { name: "Notification", link: "/admin/notification", icon: IoIosNotifications },
    { name: "Reset password", link: "/admin/reset", icon: MdLockReset },
  ];

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          {state.user.username}<span className="text-green-400">.</span>
        </h1>
        <p className="text-sm text-orange-400">Admin panel</p>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <nav className="space-y-2">
          {menu.map((Item, index) => (
            <Link
              key={index}
              to={Item.link}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors hover:bg-gray-100 ${
                location.pathname === Item.link ? "bg-gray-200" : ""
              }`}
            >
              <Item.icon className="mr-3 h-5 w-5" />
              {Item.name}
            </Link>
          ))}
        </nav>
        <div className="border-t pt-4 mt-6">
          <Link
            to="/"
            className="flex items-center p-3 text-gray-600 rounded hover:bg-gray-100"
          >
            <IoMdHome  className="mr-3 h-5 w-5" />
            Go to the website
          </Link>
          <Link
            to="/"
            className="flex items-center p-3 text-gray-600 rounded hover:bg-gray-100"
          >
            <IoLogOut className="mr-3 h-5 w-5" />
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AdminSidebar;
