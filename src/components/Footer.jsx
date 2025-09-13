import React from "react";
import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-[#F9F8F6] mt-30">
      <footer className="w-[100vw] items-center container mx-auto bg-[#F9F8F6] bottom-0 py-10">
        <div className="flex flex-col gap-8 items-center sm:flex-row justify-center sm:justify-between">
          <div className="flex items-center text-xl gap-2">
            <p>Git in touch</p>
            <FaGithub size={30} />
            <FaFacebook size={30} color="blue" />
            <FaInstagram size={30} color="red" />
          </div>
          <div className="flex items-center text-xl hover:underline">
            <Link to="/">Home page</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
