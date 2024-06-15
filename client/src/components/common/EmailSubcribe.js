import React from "react";
import icons from "../../ultils/icons";
const { IoIosArrowForward, FaPaperPlane } = icons;

const EmailSubcribe = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90vw] h-fit bg-bg-light py-8">
        <div className="flex flex-col items-center">
          {/*Header text*/}
          <div className="flex md:w-[50vw] w-[90vw] items-center justify-center pt-2">
            <span className="md:text-3xl text-xl text-center font-bold">
              Do you want to be among the first to know about
              <span className="md:text-3xl text-xl font-bold text-emerald-900">
                {" "}
                sale time?
              </span>
            </span>
          </div>
          {/*Sub text*/}
          <div className="w-full lg:w-1/2 py-6 px-4 flex items-center justify-center ">
            <span className="text-xs md:text-sm text-center">
              Don't miss out on any updates! Subscribe now to receive the most
              recent news, insights, and information directly from us as quickly
              as possible. By subscribing, you'll ensure that you're always in
              the loop with the latest developments, special offers, and
              exclusive content.
            </span>
          </div>
          {/*Form input*/}
          <form className="flex items-center justify-center gap-2 px-4">
            <input
              type="text"
              className="w-fit md:w-[370px] py-2.5 text-black focus:border-black border-black bg-transparent focus:ring-transparent"
              placeholder="Enter email address..."
              required
            ></input>
            <button
              class="text-red relative lg:py-2.5 py-2 px-6 
          overflow-hidden bg-button-color text-white
          shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 
          before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color-hover hover:text-black before:transition-all 
          before:duration-500 hover:before:left-0 
          hover:before:w-full"
            >
              <span class="relative z-10 hidden lg:flex">Subcribe</span>
              <span class="relative z-10 flex lg:hidden text-3xl">
                <FaPaperPlane />
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* <div className="w-full h-10"></div> */}
    </div>
  );
};

export default EmailSubcribe;
