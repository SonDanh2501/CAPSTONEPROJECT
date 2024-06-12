import React, { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getCurrent } from "store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "store/user/userSlice";
import logo from "assets/logo.png";
import logo_full from "assets/logo_full.png";
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
import Sidebar from "components/sidebar/Sidebar";

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
  IoNotifications ,
  IoMoonOutline,
  IoSunnyOutline,
  IoTimeOutline,
  IoPhonePortrait,
  IoHome,
  IoMail,
  FaXmark,
  FaBars,
  GoDotFill,
  IoChevronDown,
} = icons;

const TopHeader = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { categories } = useSelector((state) => state.app);
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
  const [isActiveNotificationTab, setisActiveNotificationTab] = useState(1);
  const [isActivetab, setIsActivetab] = useState(null);
  const [open, setOpen] = useState(false);
  const [isHoverTab, setIsHoverTab] = useState(false);
  const [isHoverSelectLanguage, setIsHoverSelectLanguage] = useState(false);
  const [isHoverUserTab, setIsHoverUserTab] = useState(false);
  const [isHoverNotification, setIsHoverNotfication] = useState(false);
  const { t } = useTranslation();
  const { infor1, infor2, infor3, infor4, infor5, infor6 } = t("information");
  const { noti1, noti2, noti3 } = t("notification");
  const handleSelectTab = (tab) => {
    setIsHoverTab(tab);
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
  console.log("CHECK >>> ", navigation);
  return (
    <div
      className="w-full h-full justify-between flex min-h-[70px] duration-200	 
      bg-bg-light "
    >
      <div className="flex items-center">
        {/*Logo*/}
        <div className="">
          <Link to={`/${path.HOME}`}>
            <img
              src={logo}
              alt="logo"
              className="ml-4 w-10 h-10 object-contain rounded-md hidden lg:flex"
            />
            <img
              src={logo_full}
              alt="logo"
              className="ml-4 w-28 h-28 object-contain rounded-md flex lg:hidden "
            />
          </Link>
        </div>
        {/*Link*/}
        <div className="relative h-fit w-fit pl-8 gap-10 text-md font-bold hidden lg:justify-center lg:flex ">
          {navigation.map((el) => (
            <div
              onMouseEnter={() => {
                setOpen(true);
                setIsHoverTab(el?.id);
              }}
              onMouseLeave={() => {
                setOpen(false);
                setIsHoverTab(false);
              }}
              className="relative h-fit w-fit"
            >
              {el?.type === "SINGLE" ? (
                /*For Single Page*/
                <NavLink
                  to={el?.path}
                  key={el.id}
                  className={({ isActive }) =>
                    isActive && setIsActivetab(el?.id)
                  }
                >
                  <div className="flex items-center gap-2">
                    <span className="uppercase">{el.value}</span>
                    <span
                      className={` ${
                        el?.type === "SINGLE" ? "hidden" : "visible"
                      } ${
                        +isHoverTab === +el?.id ? "rotate-180" : "rotate-0"
                      } transition-all duration-500`}
                    >
                      <IoChevronDown />
                    </span>
                  </div>
                  {+isHoverTab === +el?.id ? (
                    <span
                      style={{
                        transform: open ? "scaleX(1)" : "scaleX(0)",
                      }}
                      className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-green-700 transition-tranform duration-300 ease-out"
                    ></span>
                  ) : (
                    <span
                      style={{
                        transform: "scaleX(0)",
                      }}
                      className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-green-500 transition-tranform duration-300 ease-out"
                    ></span>
                  )}
                </NavLink>
              ) : (
                /*For Parent Page*/
                <span className=" cursor-default">
                  <div className="flex items-center gap-2">
                    <span className="uppercase">{el.value}</span>
                    <span
                      className={` ${
                        el?.type === "SINGLE" ? "hidden" : "visible"
                      } ${
                        +isHoverTab === +el?.id ? "rotate-180" : "rotate-0"
                      } transition-all duration-500`}
                    >
                      <IoChevronDown />
                    </span>
                  </div>
                  {+isHoverTab === +el?.id ? (
                    <span
                      style={{
                        transform: open ? "scaleX(1)" : "scaleX(0)",
                      }}
                      className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-green-700 transition-tranform duration-300 ease-out"
                    ></span>
                  ) : (
                    <span
                      style={{
                        transform: "scaleX(0)",
                      }}
                      className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-green-500 transition-tranform duration-300 ease-out"
                    ></span>
                  )}
                </span>
              )}
              {/*Hover Sub Link*/}
              <AnimatePresence>
                {open && +isHoverTab === +el?.id && el?.type === "PARENT" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    style={{ x: "-50%" }}
                    className="absolute left-1/2 top-12 z-10 text-black"
                  >
                    <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
                    <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white"></div>
                    <div className="w-60 bg-white shadow-xl">
                      <div className="flex flex-col font py-4 px-6 gap-2">
                        {/*Product Sub Link*/}
                        {el?.value === "Product" && (
                          // Pitch, News Sub Link
                          <div className="flex flex-col">
                            {el?.submenu?.map((el) => (
                              <NavLink to={el?.path}>
                                <span className="text-lg font-mono font-bold">
                                  {el?.text}
                                </span>
                                {el?.text !== "News" && <Sidebar />}
                              </NavLink>
                            ))}
                          </div>
                        )}
                        {/*Page Sub Link*/}
                        {el?.value === "Pages" && (
                          <div className="flex flex-col gap-2">
                            <span className="font-mono text-lg">
                              For Contact
                            </span>

                            <div className="flex flex-col gap-2">
                              {el?.submenu?.map((el) => (
                                <NavLink
                                  to={el?.path}
                                  className="w-fit font-mono font-light border-b-2 border-transparent hover:border-black duration-300 "
                                >
                                  <span>{el?.text}</span>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      {/*User Section Header*/}
      {isLoggedIn && current ? (
        <div className="w-fit sm:flex hidden items-center justify-end gap-4 ">
          {/*Language Icon*/}
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300 relative"
            onMouseEnter={() => setIsHoverSelectLanguage(true)}
            onMouseLeave={() => setIsHoverSelectLanguage(false)}
          >
            <span className="text-green-700">
              <img
                className=""
                src={`${i18n.language === "en" ? us : vn}`}
              ></img>
            </span>
            {/*Select Language Section*/}
            {isHoverSelectLanguage && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-50%" }}
                  className="absolute left-1/2 top-14 z-10 text-black"
                >
                  <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
                  <div className="w-fit bg-white shadow-xl px-6 py-4">
                    {/*Language Select Option */}
                    <div className="flex flex-col gap-2 mr-2">
                      {languages.map((lng) => (
                        <div
                          className="flex items-center cursor-pointer gap-2"
                          onClick={() => changeLanguage(lng.code)}
                        >
                          <img src={lng.img}></img>
                          <span className="text-sm font-bold font-mono border-b-2 border-transparent hover:border-black duration-300">
                            {lng.lang}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          {/*DarkMode Icon*/}
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => setdarkMode(!darkMode)}
          >
            <span
              className={`${darkMode ? "text-yellow-500" : "text-green-700"}`}
            >
              <IoSunnyOutline size={22} />
            </span>
          </div>
          {/*Cart Icon*/}
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300"
            onClick={() => dispatch(showOrder())}
          >
            <span className="text-green-700">
              <IoCartOutline size={22} />
              <span class="absolute flex items-center justify-center w-[16px] h-[16px] top-[12px] text-xs text-white bg-red-400 border-white rounded-full ml-3">
                {order?.length || 0}
              </span>
            </span>
          </div>
          {/*Notification Icon*/}
          <div
            className="hover:bg-gray-500/25 rounded-md p-2 cursor-pointer duration-300 relative"
            onMouseEnter={() => setIsHoverNotfication(true)}
            onMouseLeave={() => setIsHoverNotfication(false)}
          >
            <span className="text-green-700 ">
              {isHoverNotification ? (
                <IoNotifications size={22} />
              ) : (
                <IoNotificationsOutline size={22} />
              )}
            </span>
            {/*Notification Section*/}
            {isHoverNotification && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-95%" }}
                  className="absolute left-1/2 top-14 z-10 text-black"
                >
                  <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
                  <div className="w-[350px] h-[350px] sm:w-[450px] bg-white shadow-xl px-6 py-4 overflow-hidden overflow-y-auto">
                    {/*Header Notfication */}
                    <div className="p-1">
                      <span className="text-lg text-black font-bold font-mono">
                        {noti1}
                      </span>
                    </div>
                    {/*Notfication Tab Select*/}
                    <div className="w-full flex justify-between font-mono rounded-md font-semibold">
                      <span
                        className={`w-1/2 py-1 text-center rounded-md mx-1 hover:bg-button-color hover:text-white duration-500 ${
                          isActiveNotificationTab === 1
                            ? "bg-button-color-hover text-white"
                            : "text-black cursor-pointer"
                        }`}
                        onClick={() => setisActiveNotificationTab(1)}
                      >
                        {noti2}
                      </span>
                      <span
                        className={`w-1/2 py-1 text-center rounded-md mx-1 hover:bg-button-color hover:text-white duration-500 ${
                          isActiveNotificationTab === 2
                            ? "bg-button-color-hover text-white"
                            : "text-black cursor-pointer"
                        }`}
                        onClick={() => setisActiveNotificationTab(2)}
                      >
                        {noti3}
                      </span>
                    </div>
                    {/*Notfication Content*/}
                    <div className="py-2">
                      {notification?.map((el) => (
                        // Notitication avatar
                        <div className="p-1 flex gap-2 hover:bg-gray-100 cursor-pointer ">
                          <img
                            src={el?.owner?.avatar || avatar}
                            alt="avatar"
                            className="sm:w-12 sm:h-12 w-6 h-6 object-cover rounded-full mt-2"
                          />

                          <div className="w-full">
                            <div className="w-full ">
                              {/*Notfication Post By*/}
                              <span className="text-black line-clamp-3">
                                <span className="font-mono text-sm sm:text-xs">
                                  {el?.owner?.firstname} {el?.owner?.lastname}
                                </span>
                                {/*Notfication Description*/}
                                <span className="font-mono text-sm ml-1 sm:text-xs">
                                  posted {el?.title}
                                </span>
                              </span>
                            </div>
                            {/*Notfication Date Post */}
                            <div className="flex items-center gap-1 text-xs font-semibold ">
                              <span className="text-gray-400 font-mono">
                                <IoTimeOutline />
                              </span>
                              <span className="text-gray-400 font-mono text-xs font-semibold">
                                {moment(el?.createdAt).format("dddd hh:mm A")}
                              </span>
                            </div>
                          </div>
                          {/*Notfication How Long*/}
                          <div className="w-2/6 flex gap-1 mt-1.5">
                            <span className="text-xs text-blue-500 mt-0.5">
                              <GoDotFill />
                            </span>
                            <span className="text-black font-mono text-xs font-semibold tracking-tighter">
                              {moment(el?.createdAt).fromNow("ago")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          {/*Avatar User*/}
          <div
            className="cursor-pointer px-2 relative"
            onMouseEnter={() => setIsHoverUserTab(true)}
            onMouseLeave={() => setIsHoverUserTab(false)}
          >
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-8 h-8 object-cover rounded-full cursor-pointer bg-transparent"
            />
            {/*User Option Section*/}
            {isHoverUserTab && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  style={{ x: "-95%" }}
                  className="absolute left-1/2 top-14 z-10 text-black"
                >
                  <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
                  <div className="w-52 bg-white shadow-xl ">
                    {/*User Select Option */}
                    <div className="flex flex-col gap-2 px-2 py-4">
                      <div className="px-4 text-black hover:text-indigo-700 duration-300">
                        <Link
                          className="flex items-center gap-2 font-mono font-semibold"
                          to={`/${path.MEMBER}/${path.PERSONAL}`}
                        >
                          <span>
                            <IoPersonOutline />
                          </span>
                          <span>{infor1}</span>
                        </Link>
                      </div>
                      {+current.role === 1 && (
                        <div className="px-4 text-black hover:text-indigo-700 duration-300">
                          <Link
                            className="flex items-center gap-2 font-mono font-semibold"
                            to={`/${path.ADMIN}/${path.DASHBOARD}`}
                          >
                            <span>
                              <IoReaderOutline />
                            </span>
                            <span>{infor2}</span>
                          </Link>
                        </div>
                      )}
                      {+current.role === 2 && (
                        <div className="px-4 text-black hover:text-indigo-700 duration-300">
                          <Link
                            className="flex items-center gap-2 font-mono font-semibold"
                            to={`/${path.PITCHOWNER}/${path.MANAGE_PITCHOWN}`}
                          >
                            <span>
                              <IoReaderOutline />
                            </span>
                            <span>{infor4}</span>
                          </Link>
                        </div>
                      )}
                      <div className="border-t">
                        <div className="px-4 text-black hover:text-indigo-700 duration-300 cursor-pointer">
                          <span
                            onClick={() => dispatch(logout())}
                            className="flex items-center gap-2 font-mono font-semibold"
                          >
                            <span>
                              <IoLogOutOutline />
                            </span>
                            <span>{infor3}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      ) : (
        <div className="sm:flex hidden items-center justify-end px-4 gap-2">
          <Link
            className="font-bold text-lg rounded py-2 px-6 hover:bg-gray-300/50 duration-300"
            to={`/${path.LOGIN}`}
          >
            {infor5}
          </Link>
          <Link
            className="before:ease relative py-2 px-4 rounded font-bold text-lg overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40"
            to={`/${path.LOGIN}`}
          >
            {infor6}
          </Link>
        </div>
      )}

      {/*Responsive (Mobile) Section */}
      <div className="sm:hidden mr-4 flex items-center ">
        <button onClick={toggleNavbar}>
          {isOpen ? (
            <FaXmark className="text-black" size={20}></FaXmark>
          ) : (
            <FaBars className="text-black" size={20}></FaBars>
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
