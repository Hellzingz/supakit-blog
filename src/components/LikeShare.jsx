import { Button } from "./ui/button";
import { IoCopyOutline } from "react-icons/io5";
import { FacebookIcon } from "./icons/FacebookIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import { TwitterIcon } from "./icons/TwitterIcon";
import { BiSolidLike } from "react-icons/bi";
import axios from "axios";
import { useState } from "react";

function LikeShare({ isAuthenticated, setOpen, likes, postData, user })  {
  const [like, setLikes] = useState(likes);
  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        setOpen(true);
        return;
      }
      const data = { 
        user_id: user?.id,
        post_id: postData.id,
        post_title: postData.title
       }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postData.id}/likes`,
        data
      );
      const status = res.data.status;
      if (status === "liked") setLikes((l) => l + 1);
      if (status === "unliked") setLikes((l) => Math.max(l - 1, 0));
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
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mt-10 bg-gray-200 rounded-2xl px-5 py-3">
        <Button
          onClick={handleLike}
          className="w-full h-12 md:max-w-34 md:h-12 bg-white text-black border-1 rounded-3xl hover:bg-blue-400 cursor-pointer"
        >
          <BiSolidLike className="size-6" />
          <span className="text-lg">{like}</span>
        </Button>
        <div className="w-full flex justify-between md:justify-end items-center gap-3">
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
