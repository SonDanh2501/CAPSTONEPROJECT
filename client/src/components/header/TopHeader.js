import React, { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom";
import { getCurrent } from "store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "store/user/userSlice";
import logo from "assets/logo.png";
import Swal from "sweetalert2";
import icons from "ultils/icons";
import path from "ultils/path";
import { useGetNavigation } from "ultils/constant";
import { apiGetNotifications, apiGetUserOrderStatus } from "apis";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import avatar from "assets/avatarwhite.jpg";
import vn from "assets/vn.png";
import us from "assets/us.png";
import vietnam from "assets/vietnam.png";
import unitedstate from "assets/united-states.png";
import { showOrder } from "store/app/appSlice";
import moment from "moment";
import { set } from "react-hook-form";
const languages = [
  { code: "vi", lang: "Vietnamese", img: vietnam },
  { code: "en", lang: "English", img: unitedstate },
];

const {
  IoCartOutline,
  IoLogOutOutline,
  IoReaderOutline,
  IoPersonOutline,
  IoNotificationsOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoTimeOutline,
  IoPhonePortrait,
  IoHome,
  IoMail,
  FaXmark,
  FaBars,
  GoDotFill,
} = icons;

const TopHeader = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navigation = useGetNavigation();
  const [darkMode, setdarkMode] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes, isUpdateCart } = useSelector(
    (state) => state.user
  );
  const [isShowOption, setisShowOption] = useState(false);
  const [isShowNotification, setisShowNotification] = useState(false);
  const [isShowSelectLanguage, setIsShowSelectLanguage] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isActiveNotificationTab, setisActiveNotificationTab] = useState([]);
  const [isActivetab, setIsActivetab] = useState(null);
  const [open, setOpen] = useState(false);
  const [isHoverTab, setIsHoverTab] = useState(false);

  const { t } = useTranslation();
  const { infor1, infor2, infor3, infor4, infor5 } = t("information");
  const { noti1, noti2, noti3 } = t("notification");
  const handleSelectTab = (tab) => {
    setIsHoverTab(tab)
    setOpen(true);
  };
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  const fetchPitchData = async () => {
    const response = await apiGetUserOrderStatus(current?._id);
    if (response.success) {
      setOrder(response.Booking);
    }
  };

  const fetnotification = async () => {
    const response = await apiGetNotifications();
    if (response.success) {
      setNotification(response.notification);
    }
  };
  useEffect(() => {
    if (mes) {
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
    }
  }, [mes]);

  const toggleNavbar = () => {
    setisOpen(!isOpen);
  };

  useEffect(() => {
    fetnotification();
  }, []);
  useEffect(() => {
    // console.log("RERENDER ORDER")
    const setTimeoutId = setTimeout(() => {
      fetchPitchData();
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isUpdateCart, current]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setdarkMode(true);
    } else {
      setdarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div
      className="w-full h-full flex min-h-[70px] justify-between duration-200 
      bg-header-bg-light dark:bg-header-bg-dark"
    >
      <div className="flex items-center">
        <div className="">
          <Link to={`/${path.HOME}`}>
            <img
              src={logo}
              alt="logo"
              className="ml-4 w-12 h-12 object-contain rounded-md"
            />
          </Link>
        </div>
        <div className="relative h-fit w-fit pl-8 gap-4 text-md font-bold hidden lg:justify-center lg:flex ">
          {navigation.map((el) => (
            <div
              onMouseEnter={() => handleSelectTab(el?.id)}
              onMouseLeave={() => {
                setOpen(false);
              }}
              className="relative h-fit w-fit"
            >
              <NavLink
                to={el.path}
                key={el.id}
                className={({ isActive }) => isActive && setIsActivetab(el?.id)}
              >
                <span className="uppercase">{el.value}</span>
                {+isHoverTab === +el?.id && (
                  <span
                    style={{
                      transform: open ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-green-300 transition-tranform duration-300 ease-out"
                  ></span>
                )}
              </NavLink>
              <AnimatePresence>
                {open && +isHoverTab === +el?.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    style={{ x: "-50%" }}
                    className="absolute left-1/2 top-12 z-10 text-black"
                  >
                    <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
                    <div className=" absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-green-500"></div>
                    <div className="h-24 w-64 p-6 bg-green-500 shadow-xl">
                      <span className="text-white">Hello</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn && current ? (
        <div className="w-1/4 flex items-center justify-end gap-4">
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => setIsShowSelectLanguage(!isShowSelectLanguage)}
          >
            <span className="text-icon-bg-dark ">
              <img src={`${i18n.language === "en" ? us : vn}`}></img>
            </span>
          </div>

          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => setdarkMode(!darkMode)}
          >
            <span className="text-icon-bg-dark">
              <IoSunnyOutline size={22} />
            </span>
          </div>
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => dispatch(showOrder())}
          >
            <span className="text-icon-bg-dark">
              <IoCartOutline size={22} />
              <span class="absolute flex items-center justify-center w-[16px] h-[16px] top-[12px] text-xs text-white bg-red-400 border-white rounded-full ml-3">
                {order?.length || 0}
              </span>
            </span>
          </div>

          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => setisShowNotification(!isShowNotification)}
          >
            <span className="text-icon-bg-dark">
              <IoNotificationsOutline size={22} />
            </span>
          </div>
          <div
            className="cursor-pointer px-2"
            onClick={() => setisShowOption(!isShowOption)}
          >
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-8 h-8 object-cover rounded-full cursor-pointer"
            />
            {/* <span className="text-white">{`${current?.lastname} ${current?.firstname}`}</span> */}
          </div>
          {isShowNotification && (
            <div className="absolute flex-col flex mt-[570px] bg-header-bg-dark-tab w-[450px] h-[500px] py-2 rounded-lg z-10 right-5">
              <div className="p-4">
                <span className="text-white font-bold">{noti1}</span>
              </div>
              <div className="flex justify-between mx-4 py-2 bg-bg-select-tab rounded-md">
                <span
                  className={`w-1/2 py-1 text-center rounded-md mx-2 hover:text-indigo-700 duration-500 ${
                    isActiveNotificationTab === 1
                      ? "bg-notification-bg-dark-active-tab text-indigo-700"
                      : "text-font-bg-dark cursor-pointer"
                  }`}
                  onClick={() => setisActiveNotificationTab(1)}
                >
                  {noti2}
                </span>
                <span
                  className={`w-1/2 py-1 text-center rounded-md mx-2 hover:text-indigo-700 duration-500 ${
                    isActiveNotificationTab === 2
                      ? "bg-notification-bg-dark-active-tab text-indigo-700"
                      : "text-font-bg-dark cursor-pointer"
                  }`}
                  onClick={() => setisActiveNotificationTab(2)}
                >
                  {noti3}
                </span>
              </div>
              <div className="py-2 overflow-y-auto">
                {notification?.map((el) => (
                  <div className="p-4 flex gap-2 hover:bg-bg-select-tab cursor-pointer ">
                    <img
                      src={el?.owner?.avatar || avatar}
                      alt="avatar"
                      className="w-12 h-12 object-cover rounded-md "
                    />
                    <div className="">
                      <div className="w-[250px]">
                        <span className="text-white line-clamp-3">
                          <span className="font-bold">
                            {el?.owner?.firstname} {el?.owner?.lastname}
                          </span>
                          <span className=""> posted {el?.title}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-header-bg-dark-tab-font">
                          <IoTimeOutline />
                        </span>
                        <span className="text-header-bg-dark-tab-font">
                          {moment(el?.createdAt).format("dddd hh:mm A")}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2">
                      <span className="text-xs text-blue-500 mt-1.5">
                        <GoDotFill />
                      </span>
                      <span className="text-header-bg-dark-tab-font">
                        {moment(el?.createdAt).fromNow("ago")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isShowSelectLanguage && (
            <div className="absolute flex-col flex mt-[170px] bg-header-bg-dark-tab w-[160px] h-[100px] py-2 rounded-lg z-10 right-24">
              {languages.map((lng) => (
                <div
                  className="flex items-center px-4 py-2 my-1 gap-2 cursor-pointer text-font-bg-dark font-bold hover:text-blue-500 duration-300"
                  onClick={() => changeLanguage(lng.code)}
                >
                  <img src={lng.img}></img>
                  <span>{lng.lang}</span>
                </div>
              ))}
            </div>
          )}
          {isShowOption && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute flex-col flex mt-[290px] bg-header-bg-dark-tab min-w-[270px] py-2 rounded-lg z-10"
            >
              <div className="px-2">
                <div className="flex px-4 py-2 items-center border-b border-gray-700/70">
                  <img
                    src={current?.avatar || avatar}
                    alt="avatar"
                    className={`w-16 h-16 rounded-md`}
                  />
                  <div className={`flex justify-between items-center ml-3`}>
                    <div className="leading-4 flex flex-col">
                      <span className="font-bold text-white text-xl">
                        {current?.firstname} {current?.lastname}
                      </span>
                      <span className="text-header-bg-dark-tab-font">
                        {current?.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-700/70">
                  <div className="px-4 text-font-bg-dark hover:text-indigo-700 duration-300">
                    <Link
                      className="flex items-center gap-4 p-2"
                      to={`/${path.MEMBER}/${path.PERSONAL}`}
                    >
                      <span>
                        <IoPersonOutline size={21} />
                      </span>
                      <span>{infor1}</span>
                    </Link>
                  </div>
                  {+current.role === 1 && (
                    <div className="px-4 text-font-bg-dark hover:text-indigo-700 duration-300">
                      <Link
                        className="flex items-center gap-4 p-2 "
                        to={`/${path.ADMIN}/${path.DASHBOARD}`}
                      >
                        <span>
                          <IoReaderOutline size={21} />
                        </span>
                        <span>{infor2}</span>
                      </Link>
                    </div>
                  )}
                  {+current.role === 2 && (
                    <div className="px-4 text-font-bg-dark hover:text-indigo-700 duration-300">
                      <Link
                        className="flex items-center gap-4 p-2"
                        to={`/${path.PITCHOWNER}/${path.MANAGE_PITCHOWN}`}
                      >
                        <span>
                          <IoReaderOutline size={21} />
                        </span>
                        <span>{infor4}</span>
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <div className="px-4 text-font-bg-dark hover:text-indigo-700 duration-300 cursor-pointer">
                    <span
                      onClick={() => dispatch(logout())}
                      className="flex items-center gap-3 p-2"
                    >
                      <IoLogOutOutline size={24} />
                      {infor3}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-end px-4 gap-2">
          <Link
            className="text-md font-bold py-2 px-4 hover:bg-gray-300/50 rounded text-black hover:scale-[1.02] transition-all"
            to={`/${path.LOGIN}`}
          >
            Login
          </Link>
          <Link
            className="before:ease relative py-2 px-2 rounded font-bold overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40"
            to={`/${path.LOGIN}`}
          >
            Sign Up
          </Link>
        </div>
      )}
      <div className="lg:hidden mr-4">
        <button onClick={toggleNavbar}>
          {isOpen ? (
            <FaXmark className="text-white" size={20}></FaXmark>
          ) : (
            <FaBars className="text-white" size={20}></FaBars>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex basis-full flex-col items-center mt-2 bg border">
          {navigation.map((el) => (
            <NavLink
              to={el.path}
              key={el.id}
              className={({ isActive }) =>
                isActive
                  ? "pr-12 hover:text-orange text-orange"
                  : "pr-12 hover:text-orange text-white"
              }
            >
              {el.value}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(TopHeader);
