import { useNavigate } from "react-router-dom";
import { timeSpace } from "@/utils/timeSpace";
import axios from "axios";
const NotificationDropBox = ({ data, handleOpen }) => {
  const notifications = data;
  const navigate = useNavigate();
  const handleRead = (notifications) => {
    try {
      navigate(`/post/${notifications.target_id}`);
      axios.put(`${import.meta.env.VITE_API_URL}/notifications/${notifications.id}/read`, {
        is_read: true,
      });
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg flex flex-col gap-4 shadow-xl px-4 py-6">
      {notifications?.map((notification) => (
        <div
          onClick={() => handleRead(notification)}
          key={notification.id}
          className="flex flex-col hover:bg-gray-100 rounded-lg"
        >
          <div className="flex items-center gap-4">
            {notification.actor.profile_pic ? (
              <img
                src={notification.actor.profile_pic}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <UserAvartar />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <span>
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
    </div>
  );
};
export default NotificationDropBox;
