import React, { Fragment, memo, useState } from "react";
import avatar from "assets/defaultava.png";
import { useGetmemberSidebar } from "ultils/constant";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/logo_full.png";
import clsx from "clsx";
import { useSelector } from "react-redux";
import path from "ultils/path";
import ThemeToggle from "components/buttons/ThemeToggle";
import icons from "ultils/icons";
import { useTranslation } from "react-i18next";

const { FaAngleRight, FaAngleDown, GoDotFill, BiSolidLogOut, LuArrowLeftToLine, LuSun, FaMoon } = icons;

const activedStyle =
  "px-4 py-2 flex items-center gap-2 bg-gradient-to-tr from-indigo-100 to-indigo-400 rounded-md text-indigo-700";
const notactivedStyle =
  "px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 hover:rounded-md hover:text-indigo-700 text-gray-400 duration-300";

const Membersidebar = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { sidebar1, sidebar2, sidebar3 } = t("sidebar")
  const [darkModeSideBar, setdarkModeSideBar] = useState(true);
  const memberSidebar = useGetmemberSidebar();
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
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
  console.log(current.role);
  return (
    <div
      className={`bg-white overflow-y-auto h-full py-4 border-r shadow-lg flex flex-col justify-between  ${open ? "w-60" : "w-20"
        } duration-300`}
    >
      <div className="">
        <div className="flex items-center justify-between p-4 pb-2 ">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className={`w-32 ${!open && "hidden"}`}
            />
          </Link>
          <LuArrowLeftToLine
            onClick={() => setOpen(!open)}
            className={`  text-2xl cursor-pointer rounded-md ${!open && "rotate-180 mr-2 text-3xl"
              } `}
          />

          {/* <h1
            className={`text-gray-400 font-bold text-center duration-500 ${
              !open && "scale-0"
            }`}
          >
            Admin Workspace
          </h1> */}
        </div>
        {/* <div className="w-full flex flex-col items-center justify-center py-4 text-white ">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className={`${open ? "w-16 h-16" : "w-10 h-10"
            } object-cover duration-500`}
        />
        <small
          className={`duration-500 font-bold ${!open && "scale-0"}`}
        >{`${current?.lastname} ${current?.firstname}`}</small>
      </div> */}
        {/* <BsArrowLeftShort
        onClick={() => setOpen(!open)}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3.5 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"
          } `}
      /> */}

        <div className="mt-10 ml-3 mr-5">
          {memberSidebar.map((el) => (
            <Fragment key={el.id}>
              {el.type === "SINGLE" && el.id > 1 && +current.role === 1 ? (
                <span></span>
              ) : (
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
                    className={`${open
                      ? "text-sm "
                      : `absolute left-full text-center py-2 ml-4 bg-indigo-100 rounded-md text-indigo-800 text-sm w-[110px] transition-all ${hover === +el.id
                        ? "visible translate-x-0 opacity-100"
                        : " invisible -translate-x-3 opacity-20"
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
                    className={`flex items-center justify-between px-4 py-2 my-2 hover:bg-slidebar_active hover:text-indigo-700 rounded-md cursor-pointer duration-300 ${activedTab === +el.id
                      ? "bg-gradient-to-tr from-indigo-100 to-indigo-400 text-indigo-700 duration-300"
                      : "text-gray-400 "
                      }`}
                    onMouseOver={() => setHover(+el.id)}
                    onMouseLeave={() => setHover([])}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${open ? "text-lg" : "text-2xl"}`}>
                        {el.icon}
                      </span>
                      <span
                        className={`${open
                          ? "text-sm "
                          : `absolute left-full text-center py-2 ml-4 bg-indigo-100 rounded-md text-indigo-800 text-sm w-[110px] transition-all ${hover === +el.id
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
                      className={`flex flex-col text-white ${!open && "hidden"
                        }`}
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
                              "px-4 py-2 flex items-center gap-2 rounded-md text-indigo-700",
                              !isActive &&
                              "px-4 py-2 flex items-center gap-2 hover:text-blue-700 text-gray-400",
                              "px-4 py-2 my-2"
                            )
                          }
                        >
                          <span className="text-xs">
                            <GoDotFill />
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
            className={`w-5 h-5 rounded-md border ${!open && "ml-1 w-6 h-6"}`}
          />
          <div
            className={`flex justify-between items-center ml-3 w-52 ${!open && "hidden"
              }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">
                {current?.firstname} {current?.lastname}
              </h4>
              <span className="text-xs text-gray-600">{current?.email}</span>
            </div>
          </div>
        </div>

        <div className="h-[40px] hover:bg-slidebar_active flex items-center rounded-md text-gray-400 hover:text-indigo-700 ">
          <Link to={path.PUBLIC}>
            <div className=" flex ml-4 items-center">
              <span className={`${open ? "text-xl" : "text-3xl"}`}>
                <BiSolidLogOut />
              </span>
              <span
                className={`text-sm duration-300 pl-2  ${!open && "hidden"}`}
              >
                {sidebar1}
              </span>
            </div>
          </Link>
        </div>
        <div className="h-[40px] hover:bg-slidebar_active flex items-center rounded-md text-gray-400">
          <div
            className={`${!open ? "ml-2" : "ml-4"
              } flex ml-2 items-center gap-2`}
          >
            <span className={`text-sm duration-300 ${!open && "hidden"}`}>
              {darkModeSideBar ? (
                <span className="flex items-center justify-center gap-2">
                  <FaMoon /> {sidebar2}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LuSun /> {sidebar3}
                </span>
              )}
            </span>
            <div className={`${open && "pl-10"}`}>
              <ThemeToggle SideBar setdarkModeSideBar={setdarkModeSideBar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Membersidebar);
