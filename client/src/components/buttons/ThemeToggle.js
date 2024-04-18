import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
const { BsSunFill, FaMoon,LuSun } = icons;

const ThemeToggle = ({ SideBar, setdarkModeSideBar }) => {
  const [darkMode, setdarkMode] = useState(true);

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
      className={`relative ${
        SideBar ? "w-12 h-6" : "w-14 h-6"
      } flex items-center dark:bg-black bg-white cursor-pointer rounded-full p-1`}
      onClick={() => {
        setdarkMode(!darkMode); setdarkModeSideBar?.(!darkMode);
      }}
    >
      <FaMoon
        className={`${darkMode ? "text-white" : "text-black"}`}
        size={SideBar ? 12 : 16}
      ></FaMoon>
      <div
        className={`absolute bg-black dark:bg-white ${
          SideBar ? "w-4 h-4" : "w-5 h-5"
        } rounded-full shadow-md duration-500 ${
          darkMode ? "left-1" : `${SideBar ? "left-7" : "left-8"}`
        }`}
      ></div>
      <LuSun
        className={`ml-auto ${darkMode ? "text-white" : "text-black"}`}
        size={SideBar ? 12 : 16}
      ></LuSun>
    </div>
  );
};

export default memo(ThemeToggle);
