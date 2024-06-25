import React, { memo } from "react";
import icons from "ultils/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo_full from "assets/logo_full.png";
import visa from "assets/visa.png";
import paypal from "assets/paypal.png";
import master from "assets/mastercard.png";
import amex from "assets/amex.png";
const {
  FaFacebookF,
  FaDiscord,
  FaInstagram,
  FaYoutube,
  FaGithub,
  IoPhonePortrait,
  IoHome,
  IoMail,
} = icons;
const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    foot1,
    foot2,
    foot3,
    foot4,
    foot5,
    foot6,
    foot7,
    foot8,
    foot9,
    foot10,
    foot11,
    foot12,
    foot13,
    foot14,
    foot15,
  } = t("footer");
  return (
    <div className="w-full bg-bg-light flex justify-center">
      <div className="w-[90vw]">
        <div className="px-10 pt-8 text-gray-200 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {/*Intro and logo*/}
              <div className="mb-5 flex flex-col lg:items-start items-center">
                {/*Logo*/}
                <img
                  src={logo_full}
                  alt="logo"
                  className="w-48 md:ml-2.5 object-contain"
                />
                {/*Intro text*/}
                <p className="text-black text-sm py-4 md:ml-2.5 text-center lg:text-start">
                  {foot11}
                </p>
                {/*Icon social media*/}
                <div className="flex ">
                  <a
                    href="https://www.facebook.com/profile.php?id=61554601046418"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-lg hover:bg-blue-600 hover:text-white mx-1 text-black transition duration-300 hover:scale-125 cursor-pointer transform"
                  >
                    <FaFacebookF />
                  </a>

                  {/* <a
                    href="#"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-lg hover:bg-pink-600 hover:text-white mx-1 text-black transition duration-300 hover:scale-125 cursor-pointer transform"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-lg hover:bg-red-600 hover:text-white mx-1 text-black transition duration-300 hover:scale-125 cursor-pointer transform"
                  >
                    <FaYoutube />
                  </a> */}
                  <a
                    href="https://github.com/SonDanh2501"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-lg hover:bg-black hover:text-white mx-1 text-black transition duration-300 hover:scale-125 cursor-pointer transform"
                  >
                    <FaGithub />
                  </a>
                  {/* <a
                    href="#"
                    className="w-6 h-6 flex items-center justify-center rounded-full text-lg hover:bg-gray-600 hover:text-white mx-1 text-black transition duration-300 hover:scale-125 cursor-pointer transform"
                  >
                    <FaDiscord />
                  </a> */}
                </div>
              </div>
              {/*Shop now*/}
              <div className="mb-5 lg:ml-12">
                {/*Header*/}
                <div className="relative mb-3.5">
                  <h4 className="text-2xl py-2 text-green-800 font-bold uppercase">
                    {foot3}
                  </h4>
                  <span
                    style={{
                      transform: "scaleX(0.1)",
                    }}
                    className="absolute -bottom-0 -left-0 -right-2 h-1 origin-left rounded-full bg-emerald-900"
                  ></span>
                </div>
                {/*Subtext*/}
                <ul className="text-black">
                  <li className="flex items-center gap-1">
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                  <li className="flex items-center gap-1">
                    <a href="#" className="hover:underline">
                      {foot4}
                    </a>
                  </li>
                  <li className="flex items-center gap-1">
                    <a href="#" className="hover:underline">
                      {foot5}
                    </a>
                  </li>
                </ul>
              </div>
              {/*Useful links*/}
              <div className="mb-5">
                {/*Header*/}
                <div className="relative mb-3.5">
                  <h4 className="text-2xl py-2 text-green-800 font-bold uppercase">
                    {foot7}
                  </h4>
                  <span
                    style={{
                      transform: "scaleX(0.1)",
                    }}
                    className="absolute -bottom-0 -left-0 -right-2 h-1 origin-left rounded-full bg-emerald-900"
                  ></span>
                </div>
                {/*Subtext*/}
                <ul className="text-black">
                  <li className="flex items-center gap-1">
                    <a href="#" className="hover:underline">
                      {foot8}
                    </a>
                  </li>
                  <li className="flex items-center gap-1">
                    <a href="#" className="hover:underline">
                      {foot9}
                    </a>
                  </li>
                </ul>
              </div>
              {/*Information*/}
              <div className="mb-5">
                {/*Header*/}
                <div className="relative mb-3.5">
                  <h4 className="text-2xl py-2 text-green-800 font-bold uppercase">
                    Information
                  </h4>
                  <span
                    style={{
                      transform: "scaleX(0.1)",
                    }}
                    className="absolute -bottom-0 -left-0 -right-2 h-1 origin-left rounded-full bg-emerald-900"
                  ></span>
                </div>
                {/*Subtext*/}
                <ul className="text-black">
                  <li className="flex flex-col gap-1">
                    {/*Phone icon footer*/}
                    <div className="flex pb-2 gap-2">
                      <div className="flex text-xl">
                        <IoMail />
                      </div>
                      <div className="flex justify-center items-center">
                        <span>Example@gmail.com.vn</span>
                      </div>
                    </div>
                    {/*Email icon Footer*/}
                    <div className="flex pb-2 gap-2">
                      <div className="flex text-xl">
                        <IoPhonePortrait />
                      </div>
                      <div className="flex justify-center items-center">
                        <span>+84-779-902-051</span>
                      </div>
                    </div>
                    {/*Address icon Footer*/}
                    <div className="flex pb-2 gap-2">
                      <div className="flex text-xl">
                        <IoHome />
                      </div>
                      <div className="flex justify-center items-center">
                        <span>
                          1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức,
                          Thành phố Hồ Chí Minh
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-black mx-10 border-t border-green-700 ">
          <div className="py-6">
            <span className="text-sm">© 2024 Football Booking</span>
          </div>
          <div className="flex gap-4">
            <img src={paypal} alt="logo" className="w-8 object-contain" />
            <img src={visa} alt="logo" className="w-8 object-contain" />
            <img src={master} alt="logo" className="w-8 object-contain" />
            {/* <img src={amex} alt="logo" className="w-8 object-contain" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
