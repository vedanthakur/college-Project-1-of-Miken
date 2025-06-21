import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div className="text-white bg-black flex flex-col items-center gap-5 px-[8vw] pt-20 mt-24" id="footer">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-2xl">KhajaSathi</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
            quisquam possimus neque porro nam. Inventore odio in cumque beatae
            natus, quidem molestiae alias dolores, maxime doloribus temporibus
            at a dolor.
          </p>
          <div className="flex items-center">
            <img src={assets.facebook_icon} alt="Facebook" className="w-10 mr-4" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-10 mr-4" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-10 mr-4" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-xl font-semibold">COMPANY</h2>
          <ul className='space-y-1'>
            <li>Home</li>
            <li>About us</li>
            <li>Delievry</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <ul>
            <li className="mb-2">+999 999 9990</li>
            <li className="mb-2">contact@tomato.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full h-[2px] my-5 bg-gray-500 border-none" />
      <p className="text-center text-sm">
        © 2024 Tomato.com – All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
