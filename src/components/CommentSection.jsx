import axios from "axios";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { formatDate } from "@/utils/date";

const CommentSection = ({ isAuthenticated, setOpen, user, postId }) => {
  const { data } = useFetch(
    `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`
  );
  const comments = data.comments;

  const [comment, setComment] = useState("");
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        setOpen(true);
        return;
      }
      const data = {
        post_id: postId,
        user_id: user?.id,
        comment_text: comment,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
        data
      );
      console.log(res);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10">
      <div className="mb-20">
        <h3 className="text-lg font-semibold mb-2">Comment</h3>
        <div>
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
              className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div>
        {comments?.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <div className="flex gap-5">
              <img
                src={comment.pic}
                alt={comment.name}
                className="rounded-full size-12 object-cover"
              />
              <div>
                <div className="flex flex-col items-start justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
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
    </div>
  );
};
export default CommentSection;
