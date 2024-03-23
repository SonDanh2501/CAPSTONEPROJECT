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
        <div className="relative w-16 h-8 flex items-center dark:bg-black bg-teal-500 cursor-pointer rounded-full p-1"
            onClick={() => setdarkMode(!darkMode)}>
            <FaMoon className="text-white" size={18}></FaMoon>
            <div className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                style={darkMode ? { left: "2px" } : { right: "2px" }}
            ></div>
            <BsSunFill className="ml-auto text-yellow-400" size={18}></BsSunFill>
        </div>
    );
};

export default memo(ThemeToggle);
