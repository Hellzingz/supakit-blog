import { Button } from "./ui/button";
import { CiFaceSmile } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

function LikeShare({ isAuthenticated, setOpen, likes, postId ,user}) {
  const [like, setLikes] = useState(likes)
  
  const handleLike = async () => {
    try {
      if (!isAuthenticated) {
        setOpen(true);
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`,{ user_id: user.id });
      const status = res.data.status;
      if (status === "liked") setLikes(likes + 1);
      if (status === "unliked") setLikes(Math.max(likes - 1, 0));
    } catch (error) {
      console.log(error);
    }
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
          className="w-full sm:w-auto bg-white text-black border-1 rounded-3xl hover:bg-blue-300 cursor-pointer"
        >
          <CiFaceSmile />
          {like}
        </Button>
        <div className="w-full flex justify-between sm:justify-end items-center gap-3">
          <div>
            <Button className="bg-white hover:bg-gray-100 text-black rounded-3xl">
              <IoCopyOutline />
              <span>Copy Link</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <FaFacebook onClick={shareToFacebook} size={30} color="blue" className="cursor-pointer" />
            <FaLinkedin onClick={shareToLinkedIn} size={30} color="blue" className="cursor-pointer" />
            <FaTwitterSquare
              onClick={shareToTwitter}
              size={30}
              color="skyblue"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default LikeShare;
