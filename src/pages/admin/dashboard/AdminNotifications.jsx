import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/context/authContext";
import { timeSpace } from "@/utils/timeSpace";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminNotifications() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch(
    `${import.meta.env.VITE_API_URL}/notifications/${state.user.id}/`
  );

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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  return (
    <div className="flex w-full bg-gray-100">
      <main className="flex-1 px-4 md:px-10 bg-white overflow-auto">
        <div className="flex justify-between items-center border-b py-4 md:py-10 mb-6">
          <h2 className="text-2xl font-semibold">Notification</h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {Array.isArray(data) &&
              data.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleRead(notification)}
                >
                  <div className="p-0 md:p-4 rounded-lg flex flex-col md:flex-row items-start md:justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={notification.actor.profile_pic}
                          // alt={notification.actor_name}
                        />
                        <AvatarFallback>
                          {notification.actor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>
                          {notification.actor.name}{" "}
                          <span className="text-gray-500">
                            {notification.message}
                          </span>
                        </div>
                        <div>{timeSpace(notification.created_at)}</div>
                      </div>
                    </div>
                    <div className="text-center md:text-right rounded-md bg-gray-300 py-2 px-4 hover:bg-gray-400 transition-colors cursor-pointer">
                      <button className="text-sm font-medium cursor-pointer">
                        View
                      </button>
                    </div>
                  </div>
                  <hr className="border-gray-200 my-4" />
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default AdminNotifications;
