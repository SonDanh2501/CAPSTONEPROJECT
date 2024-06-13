import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { HeaderBanner } from "components";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const { contact1, contact2, contact3, contact4, contact5, contact6, contact7, contact8, contact9, contact10, contact11, contact12, } = t("contact")

  const form = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_MAIL_SERVICE,
        process.env.REACT_APP_MAIL_TEMPLATE,
        form.current,
        process.env.REACT_APP_MAIL_KEY
      )
      .then(
        (result) => {
          e.target.reset();
          Swal.fire("Congratulation", result.text, "success");
        },
        (error) => {
          Swal.fire("Oops!", error.text, "error");
        }
      );
  };

  const validateForm = () => {
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    setIsFormValid(name && email && message);
  };

  useEffect(() => {
    window.scrollTo(450, 450);
  }, []);

  return (
    <div className="w-full  dark:bg-medium mb-5">
      <div>
        <HeaderBanner title={contact1} subtitle={contact2} />
      </div>

      <div className="flex justify-center items-center mt-14 pb-6">
        <div className="w-main flex justify-between bg-white dark:bg-dark  ">
          {/* Fill in Form*/}
          <div className="w-2/3 flex justify-center items-center flex-col pb-6 ">
            <h1 className="text-4xl font-bold text-black p-8 dark:text-white">
              {contact3}
            </h1>
            <form
              className="flex flex-col w-[500px] "
              ref={form}
              onSubmit={sendEmail}
              onChange={validateForm}
            >
              {/* name*/}
              <label className="mt-2 mb-1 text-lg dark:text-white">{contact4}</label>
              <input
                className="rounded-md text-lg"
                type="text"
                name="user_name"
                placeholder={`${contact10}: john cena`}
                required
              />
              {/* user email*/}
              <label className="mt-2 mb-1 text-lg dark:text-white">Email</label>
              <input
                className="rounded-md text-lg"
                type="email"
                name="user_email"
                placeholder={`${contact10}: Example@gmail.com`}
                required
              />
              {/* Message*/}
              <label className="mt-2 mb-1 text-lg dark:text-white">
                {contact5}
              </label>
              <textarea
                className="rounded-md text-lg h-32"
                name="message"
                placeholder={contact11}
                required
              />
              {/* button send*/}
              <input
                className={`mt-4 cursor-pointer  h-[40px] text-white
                flex 
                items-center 
                justify-center
                gap-2
                px-1 py-2
                md:px-2
                rounded-3xl
                relative overflow-hidden 
              bg-gray-800
              dark:bg-medium
                shadow-lg 
                transition-all 
              hover:shadow-blue-400 
                ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
                type="submit"
                value={contact12}
                disabled={!isFormValid}
              />
            </form>
          </div>
          {/* Contact information form*/}
          <div className="w-1/3 flex justify-center items-center flex-col pb-6 bg-blue-500 dark:bg-blue-950 text-white">
            <h1 className="text-4xl font-bold pb-8"> {contact6}</h1>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaLocationDot className="w-4 h-4 " />
              {/* Address*/}
              <span className="font-bold text-xl">{contact7} :</span>
              <span className="cursor-pointer text-lg">
                1 Vo Van Ngan, Linh Trung, Thu Duc
              </span>
            </span>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaPhoneAlt className="w-4 h-4 " />
              {/* Phone number*/}
              <span className="font-bold  cursor-pointer text-xl"> {contact8} :</span>
              <span className="cursor-pointer text-lg">(+84) 0900000000</span>
            </span>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <IoIosSend className="w-4 h-4 " />
              {/* Email*/}
              <span className="font-bold  cursor-pointer text-xl">Email :</span>
              <span className="cursor-pointer text-lg">debugBoy@gmail.com</span>
            </span>
            {/* Discord Link*/}
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaDiscord className="w-4 h-4 " />
              <span className="font-bold text-xl cursor-pointer">
                Discord :
              </span>
              <span className="cursor-pointer text-lg">
                <a href="https://discord.gg/CDKTeQr6"> {contact9}</a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
