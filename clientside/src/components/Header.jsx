import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary_lite rounded-lg px-6 md:px-10 lg:px-15">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-6xl text-[#1a3c34] font-semibold leading-tight md:leading-tight lg:leading-tight">
          Plant-Powered Beauty, Mindfully Crafted
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-[#1a3c34] text-sm font-light">
          <p>
            Experience the perfect balance of nature and science for nourished,
            healthy, and glowing skin — every single day.{" "}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
