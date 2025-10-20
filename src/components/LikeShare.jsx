import { Button } from "./ui/button";
import { CiFaceSmile } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import { TwitterIcon } from "./icons/TwitterIcon";
import axios from "axios";
import { useState } from "react";

function LikeShare({ isAuthenticated, setOpen, likes, postId, user, data }) {
  const [like, setLikes] = useState(likes);
  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        setOpen(true);
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`,
        { user_id: user.id }
      );
      const status = res.data.status;
      if (status === "liked") setLikes((l) => l + 1);
      if (status === "unliked") setLikes((l) => Math.max(l - 1, 0));
      const notificationType = status === "liked" ? "liked" : "unliked";
      const message = `${notificationType} your article: ${data?.title}`;
      await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, {
        type: notificationType,
        target_type: "post",
        recipient_id: data?.user?.id,
        actor_id: user?.id,
        target_id: postId,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("ลองอ่านบทความนี้สิ!");

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-10 bg-gray-200 rounded-2xl px-5 py-3">
        <Button
          onClick={handleLike}
          className="w-full sm:w-34 sm:h-12 bg-white text-black border-1 rounded-3xl hover:bg-blue-300 cursor-pointer"
        >
          <CiFaceSmile />
          {like}
        </Button>
        <div className="w-full flex justify-between sm:justify-end items-center gap-3">
          <div>
            <Button
              onClick={handleCopyLink}
              className="bg-white h-12 px-12 py-3 hover:bg-gray-100 text-black rounded-3xl"
            >
              <IoCopyOutline />
              <span>Copy Link</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <FacebookIcon
              onClick={shareToFacebook}
              width="48"
              height="48"
              className="cursor-pointer"
            />
            <LinkedInIcon
              onClick={shareToLinkedIn}
              width="48"
              height="48"
              color="#0077B5"
              className="cursor-pointer"
            />
            <TwitterIcon
              onClick={shareToTwitter}
              width="48"
              height="48"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default LikeShare;
