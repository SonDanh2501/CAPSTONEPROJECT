import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { EmailSubcribe, HeaderBanner } from "components";
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
    <div className="w-full">
      <div className="pb-12">
        <HeaderBanner title={contact1} subtitle={contact2} />
      </div>
      {/*Information*/}
      <div className="w-full flex items-center justify-center py-12">
        <div className="w-[90vw] flex items-center justify-center px-10">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col">
              {/*Adrress, Phone Header*/}
              <div className="w-full flex pb-4">
                {/*Header*/}
                <span className="w-1/2 uppercase text-lg font-bold">
                  Address
                </span>
                {/*Header*/}
                <span className="w-1/2 uppercase text-lg font-bold">
                  Call Us
                </span>
              </div>
              {/*Adrress, Phone Sub*/}
              <div className="w-full flex pb-8">
                {/*Sub*/}
                <span className="w-1/2 text-sm pr-4">
                  1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố
                  Hồ Chí Minh
                </span>
                {/*Sub*/}
                <span className="w-1/2 text-sm">(+84)837440017</span>
              </div>
              {/*Open, Email Header*/}
              <div className="w-full flex pb-4">
                {/*Header*/}
                <span className="w-1/2 uppercase text-lg font-bold">Open</span>
                {/*Header*/}
                <span className="w-1/2 uppercase text-lg font-bold">Email</span>
              </div>
              {/*Open, Email Sub*/}
              <div className="w-full flex pb-8">
                {/*Sub*/}
                <span className="w-1/2 text-sm pr-4">
                  Monday - Sunday: 5am - 12pm
                </span>
                {/*Sub*/}
                <span className="w-1/2 text-sm">BookingPitch@gmail.com</span>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <form
                className="w-3/4 flex flex-col border border-green-700"
                ref={form}
                onSubmit={sendEmail}
                onChange={validateForm}
              >
                <div className="border-b border-green-700 w-full">
                  <div className="flex flex-col p-4">
                    <span className="font-bold text-xl">
                      Got Any Questions?
                    </span>
                    <span>
                      Use the form below to get in touch with the sales team
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col">
                  {/* name*/}
                  <span className="mt-2 mb-1 font-sm font-bold dark:text-white">
                    {contact4}
                  </span>
                  <input
                    className="focus:ring-0 hover:border-green-700 focus:border-green-700 border-green-700 font-sm"
                    type="text"
                    name="user_name"
                    placeholder="Full name"
                    required
                  />
                  {/* user email*/}
                  <span className="mt-2 mb-1 font-sm font-bold dark:text-white">
                    Email
                  </span>
                  <input
                    className="focus:ring-0 hover:border-green-700 focus:border-green-700 border-green-700 font-sm"
                    type="email"
                    name="user_email"
                    placeholder="example@gmail.com"
                    required
                  />
                  {/* Message*/}
                  <span className="mt-2 mb-1 font-sm font-bold dark:text-white">
                    {contact5}
                  </span>
                  <textarea
                    className=" h-28 focus:ring-0 hover:border-green-700 focus:border-green-700 border-green-700 font-sm"
                    name="message"
                    placeholder={contact11}
                    required
                  />
                  {/* button send*/}
                  <input
                    className={`flex mt-3 items-center justify-center gap-2 py-2.5 px-8 relative overflow-hidden bg-button-color text-white transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color-hover before:transition-all before:duration-500 hover:text-black hover:before:left-0 hover:before:w-full
                ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
                    type="submit"
                    value={contact12}
                    disabled={!isFormValid}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
      <EmailSubcribe />

      </div>
    </div>
  );
};

export default Contact;
