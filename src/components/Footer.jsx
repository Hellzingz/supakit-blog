import React from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "./icons/GoogleIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import { GitHubBlack } from "./icons/GitHubBlack";

function Footer() {
  return (
    <div className="bg-[#F9F8F6] mt-30">
      <footer className="w-full items-center container mx-auto bg-[#F9F8F6] bottom-0 py-10">
        <div className="flex flex-col gap-8 items-center sm:flex-row justify-center sm:justify-between">
          <div className="flex items-center text-xl gap-6">
            <p>Git in touch</p>
            <LinkedInIcon />
            <GitHubBlack />
            <GoogleIcon />
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
