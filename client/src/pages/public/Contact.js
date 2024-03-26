import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { HeaderBanner } from "components";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
  useEffect(() => {
    window.scrollTo(450, 450);
  }, []);
  return (
    <div className="w-full">
      <div>
        <HeaderBanner title="WEBSITE INFORMATION" subtitle="Contact Us" />
      </div>

      <div className="flex   justify-between items-center bg-red-300 mr-4 ml-4">
        <div>
          <h1 className="text-[25px] font-semibold text-main mb-6 mt-6">
            Contact by email
          </h1>
          <form
            className="flex flex-col w-[500px] "
            ref={form}
            onSubmit={sendEmail}
          >
            <label className="mt-2">Name</label>
            <input className="rounded" type="text" name="user_name" />
            <label className="mt-2">Email</label>
            <input className="rounded" type="email" name="user_email" />
            <label className="mt-2">Message</label>
            <textarea className="rounded" name="message" />
            <input
              className="bg-blue-500 mt-2 cursor-pointer text-white h-[40px]"
              background
              type="submit"
              value="Send"
            />
          </form>
        </div>
        <div>contact</div>
      </div>

      {/* <div className="flex flex-col items-center ">
        <h1 className="text-[25px] font-semibold text-main mb-6 mt-6">
          Contact by email
        </h1>
        <form
          className="flex flex-col w-[500px] "
          ref={form}
          onSubmit={sendEmail}
        >
          <label className="mt-2">Name</label>
          <input className="rounded" type="text" name="user_name" />
          <label className="mt-2">Email</label>
          <input className="rounded" type="email" name="user_email" />
          <label className="mt-2">Message</label>
          <textarea className="rounded" name="message" />
          <input
            className="bg-blue-500 mt-2 cursor-pointer text-white h-[40px]"
            background
            type="submit"
            value="Send"
          />
        </form>
      </div>{" "} */}
    </div>
  );
};

export default Contact;
