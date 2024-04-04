import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
const { BsSunFill, FaMoon } = icons;

const ThemeToggle = () => {

    const [darkMode, setdarkMode] = useState(true)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
            setdarkMode(true)
        }
        else {
            setdarkMode(false)
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    return (
      <div
        className="relative w-14 h-6 flex items-center dark:bg-black bg-teal-500 cursor-pointer rounded-full p-1"
        onClick={() => setdarkMode(!darkMode)}
      >
        <FaMoon className="text-white" size={16}></FaMoon>
        <div
          className={`absolute bg-white dark:bg-medium w-5 h-5 rounded-full shadow-md duration-500 ${
            darkMode ? "left-1" : "left-8"
          }`}
        ></div>
        <BsSunFill className="ml-auto text-yellow-400" size={16}></BsSunFill>
      </div>
    );
};

export default memo(ThemeToggle);
