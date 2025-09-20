import { Button } from "./ui/button";
import { CiFaceSmile } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

function LikeShare({ isAuthenticated, setOpen }) {
  const handleLike = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
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
          className="w-full sm:w-auto bg-white text-black border-1 rounded-3xl hover:bg-blue-300"
        >
          <CiFaceSmile />
          300
        </Button>
        <div className="w-full flex justify-between sm:justify-end items-center gap-3">
          <div>
            <Button className="bg-white hover:bg-gray-100 text-black rounded-3xl">
              <IoCopyOutline />
              <span>Copy Link</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <FaFacebook onClick={shareToFacebook} size={30} color="blue" />
            <FaLinkedin onClick={shareToLinkedIn} size={30} color="blue" />
            <FaTwitterSquare
              onClick={shareToTwitter}
              size={30}
              color="skyblue"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default LikeShare;
