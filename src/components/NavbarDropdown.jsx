import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { UserAvartar } from "./icons/UserAvartar";
import { RefreshPass } from "./icons/RefreshPass";
import { AdminManage } from "./icons/AdminManage";
import { Signout } from "./icons/Signout";
import { Link } from "react-router-dom";
import NavbarProfile from "./NavbarProfile";
const NavbarDropdown = ({ isAuthenticated, state, setToggle, openMenu }) => {
  const { logout } = useAuth();
  const role = state?.user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setToggle();
    navigate("/");
  };
  const NavbarMenu =
    role === "admin"
      ? [
          { icon: <UserAvartar />, label: "Profile", link: "/user/profile" },
          {
            icon: <RefreshPass />,
            label: "Reset Password",
            link: "/user/reset",
          },
          { icon: <AdminManage />, label: "Admin panel", link: "/admin" },
        ]
      : [
          { icon: <UserAvartar />, label: "Profile", link: "/user/profile" },
          {
            icon: <RefreshPass />,
            label: "Reset Password",
            link: "/user/reset",
          },
        ];

  return (
    <>
      {isAuthenticated && (
        <div className="w-full flex flex-col mt-4 sm:mt-0">
          <div className="w-full sm:hidden">
            <NavbarProfile openMenu={openMenu} />
          </div>
          <div className="flex flex-col gap-2 border-gray-200 border-b py-4">
            {NavbarMenu.map((item) => (
              <Link
                key={item.label}
                className="flex items-center gap-4 py-2 px-4 hover:bg-gray-100 cursor-pointer"
                to={item.link}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 py-4">
            <div
              className="w-full flex items-center gap-4 px-4 py-2 sm:py-0 cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              <Signout />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NavbarDropdown;
