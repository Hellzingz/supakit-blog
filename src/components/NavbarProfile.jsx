import { useAuth } from "@/context/authContext";
import { ExpandDown } from "./icons/ExpandDown";
import NotificationBell from "./NotificationBell";
import { Avatar } from "./ui/avatar";

const NavbarProfile = ({ openMenu }) => {
  const { state } = useAuth();
  const avatar = state?.user?.profilePic;
  const name = state?.user?.name;
  const role = state?.user?.role;
  return (
    <div className="w-full flex sm:flex-row-reverse sm:gap-4 px-2 sm:px-4 items-center">
      <div
        onClick={openMenu}
        className="w-full flex items-center gap-2 sm:justify-end cursor-pointer"
      >
        <Avatar className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
          {avatar ? (
            <img src={avatar} className="object-cover rounded-full w-full h-full" />
          ) : (
            <span className="text-gray-500 text-xl font-semibold">
              {name.charAt(0)}
            </span>
          )}
        </Avatar>
        <div className="w-full flex items-center gap-2">
          <span className="text-md font-medium overflow-hidden whitespace-nowrap">
            {name}
          </span>
          <div className="hidden sm:block cursor-pointer">
            <ExpandDown />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        {role === "admin" && (
          <div className="bg-white rounded-full min-w-10 min-h-10 border border-gray-200 flex items-center justify-center cursor-pointer">
            <NotificationBell />
          </div>
        )}
      </div>
    </div>
  );
};
export default NavbarProfile;
