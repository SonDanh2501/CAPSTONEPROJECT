import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
const NewsCard = () => {
  return (
    <div className="bg-white w-[300px] h-[500px] pl-2">
      <div className="w-full h-1/2">image</div>
      <span className="font-semibold text-lg">title</span>
      <div className="flex gap-2">
        <span className="font-thin text-zinc-300 flex justify-center items-center mr-3 gap-2">
          <RiAdminFill className="w-4 h-4" />
          admin
        </span>
        <span className="ml-4 font-thin text-zinc-300 flex justify-center items-center mr-3 gap-2">
          <MdOutlineUpdate className="w-4 h-4" />
          27 December, 2019
        </span>
      </div>
      <p className="mt-2">
        Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi.
        Praesent vitae mattis nunc, egestas viverra eros.
      </p>
      <a href="/" className=" mt-8 flex items-center justify-center underline">
        Read more{" "}
      </a>
    </div>
  );
};
export default NewsCard;
