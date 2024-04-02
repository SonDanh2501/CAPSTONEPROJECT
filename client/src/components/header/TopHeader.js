import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrent } from "store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "store/user/userSlice";
import logo from "assets/logo.png";
import Swal from "sweetalert2";
import icons from "ultils/icons";
import path from "ultils/path";
import { navigation } from "ultils/constant";
import { apiGetUserOrderStatus } from "apis";

import { NavLink } from "react-router-dom";
import avatar from "assets/avatarwhite.jpg";
import { showOrder } from "store/app/appSlice";
import ThemeToggle from "components/buttons/ThemeToggle";

const { AiOutlineLogout } = icons;
const { BsCart } = icons;
const { FaBars } = icons;
const { FaXmark } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes, isUpdateCart } = useSelector(
    (state) => state.user
  );
  const [isShowOption, setisShowOption] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [order, setOrder] = useState(null);

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
    // console.log("RERENDER ORDER")
    const setTimeoutId = setTimeout(() => {
      fetchPitchData();
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isUpdateCart, current]);

  console.log("CHECK ORDER", order);
  console.log("CHECK", current);
  return (
    <div className="w-full bg-header-bg flex h-full items-center flex-wrap justify-between dark:bg-dark ">
      <div className="ml-[50px] pt-3 pb-3">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
      </div>
      <div className="h-[48px] ml-48 text-sm items-center hidden lg:flex">
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
      {isLoggedIn && current ? (
        <div className="flex items-center mr-8">
          <div>
            <span
              className="cursor-pointer hover:text-orange text-white"
              onClick={() => dispatch(showOrder())}
            >
              <BsCart size={20} />
              <span class="absolute flex items-center justify-center w-[16px] h-[16px] text-xs text-white bg-red-400 border-white rounded-full top-[12px] ml-3">
                {order?.length || 0}
              </span>
            </span>
          </div>
          <div
            className="ml-5 cursor-pointer "
            onClick={() => setisShowOption((prev) => !prev)}
          >
            <label className="flex gap-2" htmlFor="file">
              <img
                src={current?.avatar || avatar}
                alt="avatar"
                className="w-6 h-6 ml-2 object-cover rounded-full cursor-pointer"
              ></img>
              {/* <span className="text-white">{`${current?.lastname} ${current?.firstname}`}</span> */}
            </label>
          </div>
          {isShowOption && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute flex-col flex mt-[165px] bg-gray-100 border min-w-[150px] py-2 rounded-md z-10"
            >
              <Link
                className="p-2 w-full hover:bg-sky-100"
                to={`/${path.MEMBER}/${path.PERSONAL}`}
              >
                Personal
              </Link>
              {+current.role === 1 && (
                <Link
                  className="p-2 w-full hover:bg-sky-100"
                  to={`/${path.ADMIN}/${path.DASHBOARD}`}
                >
                  Admin Workspace
                </Link>
              )}
              {+current.role === 2 && (
                <Link
                  className="p-2 w-full hover:bg-sky-100"
                  to={`/${path.PITCHOWNER}/${path.MANAGE_PITCHOWN}`}
                >
                  Pitch Owner Workspace
                </Link>
              )}
            </div>
          )}

          <div className="ml-7">
            <span
              onClick={() => dispatch(logout())}
              className="hover:rounded-full cursor-auto hover:text-orange p-2 text-white"
            >
              <AiOutlineLogout size={20}></AiOutlineLogout>{" "}
            </span>
          </div>
        </div>
      ) : (
        <Link
          className="mr-6 text-lg font-bold hover:text-orange text-white"
          to={`/${path.LOGIN}`}
        >
          Sign In or Sign Up
        </Link>
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
      <div className="mr-2 max-[1183px]:hidden">
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default memo(TopHeader);
