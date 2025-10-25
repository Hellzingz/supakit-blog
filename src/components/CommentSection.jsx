import axios from "axios";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { formatDate } from "@/utils/date";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import Pagination from "./Pagination";
const CommentSection = ({
  isAuthenticated,
  setOpen,
  user,
  postData,
  postId,
}) => {
  const limit = 10;
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({
    limit: limit,
    page: page,
  });

  const {
    data: { comments, totalPages },
    fetchData: fetchComments,
  } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/posts/${postId}/comments?${params.toString()}`
  );

  const handleSend = async () => {
    if (comment.trim() === "") {
      toast.error("No comment to send");
      return;
    }
    try {
      setIsLoading(true);
      if (!isAuthenticated) {
        setOpen(true);
        return;
      }
      const data = {
        post_id: postId,
        user_id: user?.id,
        post_title: postData?.title,
        comment_text: comment,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postData.id}/comments`,
        data
      );
      toast.success("Comment sent successfully");
      await fetchComments();
      setComment("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-10">
      {postData?.user?.id !== user?.id && (
        <div className="mb-20">
          <h3 className="text-lg font-semibold mb-2">Comment</h3>
          <div className="w-full">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => {
                if (!isAuthenticated) {
                  setOpen(true);
                }
              }}
              placeholder="What are your thoughts?"
              className="w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <ImSpinner2 className="animate-spin size-4" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        {Array.isArray(comments) &&
          comments.map((comment, index) => (
            <div key={index} className="flex flex-col gap-2 mb-2">
              <div className="flex gap-5">
                {comment.user.profile_pic ? (
                  <img
                    src={comment.user.profile_pic}
                    alt={comment.user.name}
                    className="rounded-full size-12 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-semibold">
                      {comment.user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex flex-col items-start justify-between">
                    <h4 className="font-semibold">{comment.user.name}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                </div>
              </div>
              <p className=" text-gray-600">{comment.comment}</p>
              {index < comments.length - 1 && (
                <hr className="border-gray-300 my-4" />
              )}
            </div>
          ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};
export default CommentSection;
