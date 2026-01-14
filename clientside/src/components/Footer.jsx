import React from "react";
import { assets } from "../assets/assets";
import { Mail, Instagram, MessageCircle, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------------ Left Section ------------ */}
        <div className="flex flex-col gap-3">
          <img className="w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Aarunya Botanicals is dedicated to creating thoughtfully developed
            Ayurvedic formulations that support wellness through tradition,
            research, and responsible care.
          </p>
        </div>

        {/* ------------ Center Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* ------------ Right Section ------------ */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex gap-2 text-gray-600">
            <li>
              <a
                href="mailto:aarunyabotanicals@gmail.com"
                aria-label="Gmail"
                className="text-gray-600 hover:text-red-500 transition transform hover:scale-110"
              >
                <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>{" "}
            </li>
            <li>
              <a
                href="https://www.instagram.com/aarunya_botanicals/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-500 transition transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/aarunyabotanicals"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 hover:text-blue-500 transition transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ------------ Copyright Text ------------ */}
      <div>
        <hr />
        {/* <p className="py-5 text-sm text-center">
          Copyright © 2024 ElyséeDev - All Right Reserved
        </p> */}
      </div>
    </div>
  );
};

export default Footer;
