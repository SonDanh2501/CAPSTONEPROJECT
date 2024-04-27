import React, { memo } from "react";

import {
  FaFacebookF,
  FaDiscord,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import icons from "ultils/icons";
import path from "ultils/path";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "components/common/LanguageSelector";
import { useTranslation } from "react-i18next";

const { FaChevronRight } = icons;

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const { foot1, foot2, foot3, foot4, foot5, foot6, foot7, foot8, foot9, foot10, foot11, foot12, foot13, foot14, foot15 } = t("footer")
  return (
    <div className="w-full">
      <div className="p-10 bg-blue-900 text-gray-200 w-full dark:bg-medium">
        <div className="flex justify-end text-black">
          <LanguageSelector></LanguageSelector>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="mb-5">
              <h4 className="text-2xl pb-4">{foot1}</h4>
              <p className="text-gray-500">
                1 Vo Van Ngan <br />
                Viet Nam <br />
                <br />
                <strong>{foot2}:</strong> +84 0837440017 <br />
                <strong>Email:</strong> sondanhwork2501@gmail.com
                <br />
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-2xl pb-4">{foot3}</h4>
              <ul className="text-gray-500">
                <li className="pb-2 flex items-center gap-1">
                  <FaChevronRight className="text-blue-500" />
                  <a href="#" className="hover:text-blue-500/50 duration-300">
                    {foot4}
                  </a>
                </li>
                <li className="pb-2 flex items-center gap-1">
                  <FaChevronRight className="text-blue-500" />
                  <a href="#" className="hover:text-blue-500/50 duration-300">
                    {foot5}
                  </a>
                </li>
                <li className="pb-2 flex items-center gap-1">
                  <FaChevronRight className="text-blue-500" />
                  <a href="#" className="hover:text-blue-500/50 duration-300">
                    {foot6}
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-2xl pb-4">{foot7}</h4>
              <ul className="text-gray-500">
                <li className="pb-2 flex items-center gap-1">
                  <FaChevronRight className="text-blue-500" />
                  <a href="#" className="hover:text-blue-500/50 duration-300">
                    {foot8}
                  </a>
                </li>
                <li className="pb-2 flex items-center gap-1">
                  <FaChevronRight className="text-blue-500" />
                  <a href="#" className="hover:text-blue-500/50 duration-300">
                    {foot9}
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">{foot10}</h4>
              <p className="text-gray-500 pb-2">
                {foot11}
              </p>
              <form className="flex gap-1">
                <input
                  type="text"
                  className="text-white focus:border-white bg-gray-700 rounded-md border-white outline-none"
                  placeholder="email@example.com"
                ></input>
                <button className="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-5 py-2">
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-900 text-gray-500 px-10 border-t-2 border-gray-400 dark:bg-medium ">
        <div className="max-w-7xl flex flex-col md:flex-row py-4 mx-auto justify-between items-center gap-4">
          <div className="text-center">
            <div>
              {foot12}{" "}
              <strong>
                <span>{foot13}</span>
              </strong>
              . {foot14}
            </div>
            <div className="flex gap-1">
              {foot15}:
              <span className="text-white">Danh Truong Son,</span>
              <span className="text-white">Dang Thanh Tuyen,</span>
              <span className="text-white">Dang Phuoc Truong Tai</span>
            </div>
          </div>
          <div className="text-center flex">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 mx-1 text-white transition duration-300 hover:scale-125 cursor-pointer transform"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-700 mx-1 text-white transition duration-500 hover:scale-125 cursor-pointer transform"
            >
              <FaDiscord />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600 hover:bg-pink-700 mx-1 text-white transition duration-500 hover:scale-125 cursor-pointer transform"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 mx-1 text-white transition duration-500 hover:scale-125 cursor-pointer transform"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
