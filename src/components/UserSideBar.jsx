import { Link, useLocation } from "react-router-dom";
import { RefreshPass } from "./icons/RefreshPass";
import { UserAvartar } from "./icons/UserAvartar";
import { useAuth } from "@/context/authContext";

function UserSideBar() {
  const location = useLocation();
  const { state } = useAuth();
  
  const menuItems = [
    {
      to: "/user/profile",
      icon: <UserAvartar />,
      label: "Profile",
      className: "flex-1"
    },
    {
      to: "/user/reset",
      icon: <RefreshPass />,
      label: "Reset Password",
      className: "flex-1 whitespace-nowrap"
    }
  ];
  console.log(state.user);
  return (
    <aside className="w-full rounded-xl p-4 max-w-64 flex flex-row sm:flex-col justify-start items-start gap-5">
      <div className="hidden sm:flex justify-center items-center gap-2">
        <img src={state.user.profilePic || <UserAvartar />} alt="" className="w-10 h-10 rounded-full" />
        <p className="text-sm font-medium">{state.user.name}</p>
      </div>
      <nav className="w-full flex flex-row sm:flex-col gap-2 tems-start">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`w-full flex items-center gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-gray-200 ${
              location.pathname === item.to ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            {item.icon} <span className={item.className}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
export default UserSideBar;
