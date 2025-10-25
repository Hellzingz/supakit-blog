import Bell from "./icons/NotificationBell";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/context/authContext";
import NotificationDropBox from "./NotificationDropBox";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { state } = useAuth();
  const limit = 4;
  const {
    data: { notifications },
  } = useFetch(
    state.user?.role === "admin"
      ? `${import.meta.env.VITE_API_URL}/notifications/${state.user.id}?limit=${limit}`
      : null
  );

  const dropdownRef = useOutsideClick(() => {
    if (open) {
      setOpen(false);
    }
  }, open);

  if (state.user?.role !== "admin") {
    return null;
  }
  const unreadNotifications = Array.isArray(notifications)
    ? notifications.filter((notification) => !notification.is_read)
    : [];
  const isUnread = unreadNotifications.length > 0;
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={handleOpen} disabled={isUnread}>
        <Bell width={24} height={24} />
        {isUnread && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>
      {open && isUnread && (
        <div className="absolute w-80 sm:w-100 top-10 right-0 z-10">
          <NotificationDropBox
            data={unreadNotifications}
            handleOpen={handleOpen}
          />
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
