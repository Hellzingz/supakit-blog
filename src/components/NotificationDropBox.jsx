import { useNavigate } from "react-router-dom";
import { timeSpace } from "@/utils/timeSpace";
import { UserAvartar } from "./icons/UserAvartar";
import axios from "axios";
import { Link } from "react-router-dom";
const NotificationDropBox = ({ data, handleOpen }) => {
  const notifications = data;
  const navigate = useNavigate();
  const handleRead = (notifications) => {
    try {
      navigate(`/post/${notifications.target_id}`);
      axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${
          notifications.id
        }/read`,
        {
          is_read: true,
        }
      );
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg flex flex-col gap-4 shadow-xl px-4 py-6">
      {Array.isArray(notifications) &&
        notifications.map((notification) => (
          <div
            onClick={() => handleRead(notification)}
            key={notification.id}
            className="flex flex-col hover:bg-gray-100 rounded-lg"
          >
            <div className="flex items-center gap-2 sm:gap-">
              {notification.actor.profile_pic ? (
                <img
                  src={notification.actor.profile_pic}
                  className="w-6 sm:w-10 h-6 sm:h-10 rounded-full"
                />
              ) : (
                <div className="rounded-full bg-gray-200 flex items-center justify-center">
                  <UserAvartar className="w-6 sm:w-10 h-6 sm:h-10" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-sm sm:text-base line-clamp-2">
                  {notification.actor.name}
                  <span className="text-gray-500"> {notification.message}</span>
                </span>
                <p className="text-[#F2B68C] text-sm">
                  {timeSpace(notification.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}
      <Link
        to="/admin/notification"
        className="w-auto text-sm text-blue-500 hover:underline text-center"
      >
        View all notifications
      </Link>
    </div>
  );
};
export default NotificationDropBox;
