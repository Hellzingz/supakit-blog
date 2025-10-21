import Bell from "./icons/NotificationBell";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/context/authContext";
import NotificationDropBox from "./NotificationDropBox";
import { useState } from "react";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { state } = useAuth();
  const { data } = useFetch(
    `${import.meta.env.VITE_API_URL}/notifications/${state.user.id}`
  );
  const unreadNotifications = Array.isArray(data) ? data.filter(
    (notification) => !notification.is_read
  ) : [];
  const isUnread = unreadNotifications.length > 0;
  console.log(data);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={handleOpen} disabled={isUnread}>
        <Bell width={24} height={24}/>
        {isUnread && (
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>
      {open && isUnread && (
        <div className="absolute w-100 top-10 right-0 z-10">
          <NotificationDropBox data={unreadNotifications} handleOpen={handleOpen}/>
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
