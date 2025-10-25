import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { timeSpace } from "@/utils/timeSpace";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import Pagination from "@/components/Pagination";

function AdminNotifications() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const params = new URLSearchParams({
    page: currentPage,
    limit: 10,
  });
  const {
    data: { notifications, totalPages },
    isLoading,
  } = useFetch(
    `${import.meta.env.VITE_API_URL}/notifications/${
      state.user.id
    }?${params.toString()}`
  );
  const handleRead = async (notifications) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${
          notifications.id
        }/read`,
        {
          is_read: true,
        }
      );
      navigate(`/post/${notifications.target_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full bg-gray-100">
      <main className="flex-1 px-4 md:px-10 bg-white overflow-auto">
        <div className="flex justify-between items-center border-b py-4 md:py-10 mb-6">
          <h2 className="text-2xl font-semibold">Notification</h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ImSpinner2 className="animate-spin text-2xl" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {Array.isArray(notifications) &&
              notifications.map((notification) => (
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
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col">
                          <div>
                            <span className="font-semibold">
                              {notification.actor.name}{" "}
                            </span>
                            <span className="text-gray-500">
                              {notification.message}
                            </span>
                            {notification.comment_text && (
                              <div className="text-black">
                                "{notification.comment_text}"
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-orange-500">
                          {timeSpace(notification.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center md:text-right rounded-md bg-gray-300 py-2 px-4 hover:bg-gray-400 transition-colors cursor-pointer">
                      <button
                        onClick={() => handleRead(notification.id)}
                        className="text-sm font-medium cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  </div>
                  <hr className="border-gray-200 my-4" />
                </div>
              ))}
            <div className="flex justify-center items-center">
              {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default AdminNotifications;
