import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { HeaderBanner } from "components";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    emailjs
      .sendForm(
        "service_phheaon",
        "template_clxxagd",
        form.current,
        "6UCB_Dfir_suWH3gL"
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
    <div className="w-full bg-gray-200">
      <div>
        <HeaderBanner title="WEBSITE INFORMATION" subtitle="Contact Us" />
      </div>

      <div className="flex justify-center items-center mt-14 pb-6">
        <div className="w-main flex justify-between bg-white ">
          <div className="w-2/3 flex justify-center items-center flex-col pb-6">
            <h1 className="text-4xl font-bold text-black p-8">Get in touch</h1>
            <form
              className="flex flex-col w-[500px] "
              ref={form}
              onSubmit={sendEmail}
              onChange={validateForm}
            >
              <label className="mt-2 mb-1 text-lg">Name</label>
              <input
                className="rounded-md text-lg"
                type="text"
                name="user_name"
                placeholder="Example: john cena"
                required
              />
              <label className="mt-2 mb-1 text-lg">Email</label>
              <input
                className="rounded-md text-lg"
                type="email"
                name="user_email"
                placeholder="Example: Example@gmail.com"
                required
              />
              <label className="mt-2 mb-1 text-lg">Message</label>
              <textarea
                className="rounded-md text-lg h-32"
                name="message"
                placeholder="Your message ..."
                required
              />
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
                shadow-lg 
                transition-all 
              hover:shadow-blue-400 
                ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
                type="submit"
                value="Send"
                disabled={!isFormValid}
              />
            </form>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col pb-6 bg-blue-500  text-white">
            <h1 className="text-4xl font-bold pb-8">Contact us</h1>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaLocationDot className="w-4 h-4 " />
              <span className="font-bold text-xl">Address :</span>
              <span className="cursor-pointer text-lg">
                1 Vo Van Ngan, Linh Trung, Thu Duc
              </span>
            </span>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaPhoneAlt className="w-4 h-4 " />

              <span className="font-bold  cursor-pointer text-xl">Phone :</span>
              <span className="cursor-pointer text-lg">(+84) 0900000000</span>
            </span>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <IoIosSend className="w-4 h-4 " />
              <span className="font-bold  cursor-pointer text-xl">Email :</span>
              <span className="cursor-pointer text-lg">debugBoy@gmail.com</span>
            </span>
            <span className="flex items-center gap-2 pt-8 pb-4 pr-4 pl-4">
              <FaDiscord className="w-4 h-4 " />
              <span className="font-bold text-xl cursor-pointer">
                Discord :
              </span>
              <span className="cursor-pointer text-lg">
                <a href="https://discord.gg/CDKTeQr6">Join us on Discord</a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
