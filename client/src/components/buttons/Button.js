import React, { memo } from "react";

const Button = ({
  name,
  handleOnClick,
  style,
  fw,
  children,
  type = "button",
  size,
}) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `text-white rounded-sm px-5 py-2.5 text-center me-2 mb-2
                bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg
                shadow-emerald-800/100 hover:shadow-emerald-700/80 
                 ${fw ? "w-full" : "w-fit"} ${size ? "text-xl" : "text-sm"}`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
