import React, { Fragment, memo, useEffect, useState } from "react";
import logo_full from "assets/logo_full.png";

import { useGetadminSideBar } from "ultils/constant";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import path from "ultils/path";
import { useSelector } from "react-redux";
import avatar from "assets/avatarwhite.jpg";
import ThemeToggle from "components/buttons/ThemeToggle";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";

const {
  FaAngleRight,
  FaAngleDown,
  IoEllipse,
  IoPlaySkipBackOutline,
  IoLogInOutline,
} = icons;

const activedStyle =
  "px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-green-400 rounded-md text-white";
const notactivedStyle =
  "px-4 py-2 flex items-center gap-2 hover:bg-emerald-400 hover:rounded-md hover:text-white text-black duration-300";

const AdminSideBar = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { sidebar1, sidebar2, sidebar3 } = t("sidebar");
  const adminSideBar = useGetadminSideBar();
  const [darkModeSideBar, setdarkModeSideBar] = useState(true);
  const { current } = useSelector((state) => state.user);
  const [actived, setActived] = useState([]);
  const [activedTab, setActivedTab] = useState([]);
  const [hover, setHover] = useState([]);
  // Check mảng nếu không có id trong mảng thì copy lại mảng và push id mới vào
  // Nếu đã có id thì lọc ra những id có trong mảng mà không phải id vừa chọn
  // Nhầm làm các tab trở nên riêng biệt với nhau (đóng tab này thì tab khác vẫn mở bth)
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID)) {
      setActived((prev) => prev.filter((el) => el !== tabID));
    } else {
      setActived((prev) => [...prev, tabID]);
    }
  };
  return (
    <div
      className={`bg-bg-light overflow-y-auto h-full py-4 border-r shadow-lg flex flex-col justify-between  ${
        open ? "w-60" : "w-24"
      } duration-300`}
    >
      <div className="">
        <div className="flex items-center justify-between p-4 pb-2 ">
          <Link to={"/"}>
            <img
              src={logo_full}
              alt="logo"
              className={`w-32 ${!open && "hidden"}`}
            />
          </Link>
          <IoPlaySkipBackOutline
            onClick={() => setOpen(!open)}
            className={`text-2xl cursor-pointer rounded-md ${!open &&
              "rotate-180 mr-2 text-3xl"} `}
          />

          {/* <h1
            className={`text-gray-400 font-bold text-center duration-500 ${
              !open && "scale-0"
            }`}
          >
            Admin Workspace
          </h1> */}
        </div>
        <div className="mx-3 mt-6">
          {adminSideBar.map((el, index) => (
            <Fragment key={el.id}>
              {el.type === "SINGLE" && (
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    clsx(
                      isActive && activedStyle,
                      !isActive && notactivedStyle,
                      "my-2"
                    )
                  }
                  onClick={() => setActivedTab(+el.id)}
                  onMouseOver={() => setHover(+el.id)}
                  onMouseLeave={() => setHover([])}
                >
                  <span className={`${open ? "text-lg" : "text-2xl"}`}>
                    {el.icon}
                  </span>
                  <span
                    className={`${
                      open
                        ? "text-sm"
                        : `absolute left-full text-center py-2 ml-4 bg-green-400 rounded-md text-white text-sm w-[110px] transition-all ${
                            hover === +el.id
                              ? "visible translate-x-0 opacity-100"
                              : "invisible -translate-x-3 opacity-20"
                          }`
                    }`}
                  >
                    {el.text}
                  </span>
                </NavLink>
              )}
              {el.type === "PARENT" && (
                <div onClick={() => handleShowTabs(+el.id)}>
                  <div
                    className={`flex items-center justify-between px-4 py-2 my-2 hover:bg-emerald-400 hover:text-white rounded-md cursor-pointer duration-300 ${
                      activedTab === +el.id
                        ? "bg-gradient-to-r from-emerald-700 to-green-400 text-white duration-300"
                        : "text-black "
                    }`}
                    onMouseOver={() => setHover(+el.id)}
                    onMouseLeave={() => setHover([])}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${open ? "text-lg" : "text-2xl"}`}>
                        {el.icon}
                      </span>
                      <span
                        className={`${
                          open
                            ? "text-sm"
                            : `absolute left-full text-center py-2 ml-4 bg-green-400 rounded-md text-white text-sm w-[110px] transition-all ${
                                hover === +el.id
                                  ? "visible translate-x-0 opacity-100"
                                  : " invisible -translate-x-3 opacity-20"
                              }`
                        }`}
                      >
                        {el.text}
                      </span>
                    </div>
                    {actived.some((id) => id === el.id) ? (
                      <FaAngleRight
                        className={`text-sm ${!open && "hidden"}`}
                      />
                    ) : (
                      <FaAngleDown className={`text-sm ${!open && "hidden"}`} />
                    )}
                  </div>
                  {actived.some((id) => +id === +el.id) && (
                    <div
                      className={`flex flex-col text-white ${!open &&
                        "hidden"}`}
                    >
                      {el.submenu.map((item) => (
                        <NavLink
                          key={el.text}
                          to={item.path}
                          onClick={(e) => {
                            setActivedTab(+el.id);
                            e.stopPropagation();
                          }}
                          className={({ isActive }) =>
                            clsx(
                              isActive &&
                                "px-4 py-2 flex items-center gap-2 rounded-md text-emerald-500",
                              !isActive &&
                                "px-4 py-2 flex items-center gap-2 hover:text-emerald-500 text-black",
                              "px-4 py-2 my-2"
                            )
                          }
                        >
                          <span className="text-sm">
                            <IoEllipse size={12} />
                          </span>
                          <span className="text-sm">{item.text}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mx-2">
        <hr className="my-3" />
        <div className="flex px-4 py-2 items-center">
          <img
            src={current?.avatar || avatar}
            alt="avatar"
            className={`w-8 h-8 rounded-md ${!open && "w-6 h-6"}`}
          />
          <div
            className={`flex justify-between items-center ml-3 w-52 ${!open &&
              "hidden"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">
                {current?.firstname} {current?.lastname}
              </h4>
              <span className="text-xs text-black">{current?.email}</span>
            </div>
          </div>
        </div>
        <div className="h-[40px] hover:bg-emerald-400 hover:text-white flex items-center rounded-md white">
          <div className={`${!open ? "ml-2" : "ml-4"} flex items-center`}>
            <span className={`text-sm duration ${!open && "hidden"}`}>
              {darkModeSideBar ? (
                <div className=" flex items-center">
                  <span
                    className={`text-sm duration-300 pl-2 ${!open && "hidden"}`}
                  >
                    {sidebar2}
                  </span>
                </div>
              ) : (
                <div className=" flex items-center">
                  <span
                    className={`text-sm duration-300 pl-2 ${!open && "hidden"}`}
                  >
                    {sidebar3}
                  </span>
                </div>
              )}
            </span>
            <div className={`${open && "pl-10"}`}>
              <ThemeToggle SideBar setdarkModeSideBar={setdarkModeSideBar} />
            </div>
          </div>
        </div>
        <div className="h-[40px] hover:bg-emerald-400 flex items-center rounded-md text-black hover:text-white duration-300">
          <Link to={path.PUBLIC}>
            <div className=" flex ml-4 items-center">
              <span className={`${open ? "text-xl" : "text-3xl"}`}>
                <IoLogInOutline />
              </span>
              <span className={`text-sm pl-2 ${!open && "hidden"}`}>
                {sidebar1}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSideBar);
