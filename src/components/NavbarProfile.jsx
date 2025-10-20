import { useAuth } from "@/context/authContext";
import { ExpandDown } from "./icons/expandDown";
import NotificationBell from "./icons/NotificationBell";
import { CiUser } from "react-icons/ci";

const NavbarProfile = () => {
  const { state } = useAuth();
  const avatar = state?.user?.profilePic;
  const name = state?.user?.name;
  const role = state?.user?.role;
  return (
    <div className="w-full flex sm:flex-row-reverse sm:gap-4 px-4 items-center">
      <div className="w-full flex items-center gap-2 sm:justify-end">
        <div className="bg-white rounded-full min-w-10 min-h-10 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} width={35} height={35} className="rounded-full" />
          ) : (
            <CiUser size={35} strokeWidth={0.1}/>
          )}
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-md font-medium overflow-hidden whitespace-nowrap">{name}</span>
          <div className="hidden sm:block cursor-pointer">
            <ExpandDown />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        {role === "admin" && (
          <div className="bg-white rounded-full min-w-10 min-h-10 border border-gray-200 flex items-center justify-center cursor-pointer">
            <NotificationBell width={24} height={24} />
          </div>
        )}
      </div>
    </div>
  );
};
export default NavbarProfile;
