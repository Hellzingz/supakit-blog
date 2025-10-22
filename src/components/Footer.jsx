import React from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "./icons/GoogleIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import { GitHubBlack } from "./icons/GitHubBlack";

function Footer() {
  const handleShareLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/supakit-jaratworrapat/",
      "_blank"
    );
  };
  const handleShareGitHub = () => {
    window.open(
      "https://github.com/Hellzingz",
      "_blank"
    );
  };

  return (
    <div className="bg-[#F9F8F6] mt-20">
      <footer className="w-full items-center container mx-auto bg-[#F9F8F6] bottom-0 py-10">
        <div className="flex flex-col gap-8 items-center sm:flex-row justify-center sm:justify-between">
          <div className="flex items-center text-xl gap-6">
            <p>Git in touch</p>
            <LinkedInIcon className="cursor-pointer" color="#0077B5" onClick={handleShareLinkedIn} />
            <GitHubBlack className="cursor-pointer" color="#000" onClick={handleShareGitHub} />
            <GoogleIcon className="cursor-not-allowed" color="#43403B"/>
          </div>
          <div className="flex items-center text-xl hover:underline cursor-pointer">
            <Link to="/">Home page</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
