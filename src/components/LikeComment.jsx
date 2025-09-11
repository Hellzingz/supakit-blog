import { Button } from "../components/ui/button";
import { CiFaceSmile } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

function LikeComment({ comments }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) {
      setOpen(true);
      return;
    }
  };

  const handleSend = () => {
    if (!isLoggedIn) {
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
          <FaTwitterSquare onClick={shareToTwitter} size={30} color="skyblue" />
          </div>
    
        </div>
      </div>
      <div className="mt-10">
        <div className="mb-20">
          <h3 className="text-lg font-semibold mb-2">Comment</h3>
          <div>
            <Textarea
              onFocus={() => setDialogState(true)}
              placeholder="What are your thoughts?"
              className="w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSend}
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
              <div className="flex gap-5">
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="rounded-full size-12 object-cover"
                />
                <div>
                  <div className="flex flex-col items-start justify-between">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <span className="text-sm text-gray-500">
                      {comment.date}
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
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="flex flex-col gap-5 items-center text-center p-13">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-3xl">
                Create an accout to continue
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Link
              to="/register"
              className="bg-black text-white rounded-3xl py-2 w-50"
            >
              Create Account
            </Link>
            <AlertDialogCancel className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100">
              <X />
            </AlertDialogCancel>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </p>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
export default LikeComment;
