import React, { useState, useEffect } from "react";
import image1 from "../../assets/banner3.jpg";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import image from "assets/banner.jpg";
import { FaChevronRight } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { apiGetNews } from "apis";
const DetailNews = () => {
  const dataNews = [
    {
      id: 1,
      title:
        "Video bóng đá Argentina - El Salvador endis totam vo endis totam ",
    },
    {
      id: 2,
      title: "Video bóng đá Argentina - El Salvador endis totam vo ",
    },
    {
      id: 3,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 4,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 5,
      title: "Video bóng đá Argentina - El Salvador endis totam vo",
    },
    {
      id: 6,
      title: "Video bóng đá Argentina - El Salvador",
    },
  ];
  
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center mt-14">
        <div className="w-main flex justify-between">
          <div
            style={{ fontFamily: "Open Sans" }}
            className=" md:w-2/3 pl-1 pr-1 w-full "
          >
            <h1 className="font-bold text-2xl pb-4 pt-4">
              Title Title TitleTitleTitleTit leTitleTitleTitleTitleTitleTitle
            </h1>
            <img src={image1} alt="thumb" className="object-cover w-full " />

            <div className="flex-row flex  gap-2 pt-4">
              <span className="font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2">
                <RiAdminFill className="w-4 h-4" />
                author
              </span>
              {/* <span className="md:ml-4 font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2">
                <MdRemoveRedEye className="text-md" />
                594
              </span> */}
              <span className="md:ml-4 font-thin text-zinc-500 flex md:justify-center items-center mr-3 gap-2  ">
                <MdOutlineUpdate className="w-4 h-4" />
                2014-23-32
              </span>
            </div>
            <div className="pt-2 pr-1 pl-1">
              <span className="text-black text-xl">
                sub title sub titlesub titlesub titlesub titlesub titlesub
                titlesub titlesub titlesub title
              </span>

              <div className="text-md pt-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
                soluta, similique quidem fuga vel voluptates amet doloremque
                corrupti. Perferendis totam voluptates eius error fuga
                cupiditate dolorum? Adipisci mollitia quod labore aut natus
                nobis. Rerum perferendis, nobis hic adipisci vel inventore
                facilis rem illo, tenetur ipsa voluptate dolorem, cupiditate
                temporibus laudantium quidem recusandae expedita dicta cum eum.
                Quae laborum repellat a ut, voluptatum ipsa eum. Culpa fugiat
                minus laborum quia nam! Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Et, praesentium, dicta. Dolorum inventore
                molestias velit possimus, dolore labore aliquam aperiam
                architecto quo reprehenderit excepturi ipsum ipsam accusantium
                nobis ducimus laudantium. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Rerum est aperiam voluptatum id
                cupiditate quae corporis ex. Molestias modi mollitia neque magni
                voluptatum, omnis repudiandae aliquam quae veniam error!
                Eligendi distinctio, ab eius iure atque ducimus id deleniti, vel
                alias sint similique perspiciatis saepe necessitatibus non
                eveniet, quo nisi soluta. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Incidunt beatae nemo quaerat,
                doloribus obcaecati odio!
              </div>
            </div>
          </div>
          <div className="md:block hidden w-1/3 pl-4 pr-8 ">
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <div className="mt-4 flex flex-col">
                {dataNews.map((el, index) => (
                  <div
                    style={{ fontFamily: "Open Sans" }}
                    className="pl-4 pr-2 pb-2 flex gap-2  cursor-pointer "
                  >
                    <MdNavigateNext className="w-6 h-6" />
                    <span className="text-lg hover:text-blue-400">
                      {el.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pt-14 ">
        <h1 className=" text-2xl font bold">RELATED NEWS</h1>
      </div>
    </div>
  );
};

export default DetailNews;
