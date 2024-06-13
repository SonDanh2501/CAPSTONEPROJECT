import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { formattedCategory } from "ultils/helper";
const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col gap-4  font-light py-2">
      {categories?.map((el) => (
        <NavLink
          key={formattedCategory(el.title)}
          to={formattedCategory(el.title)}
          className="w-fit border-b-2 border-transparent hover:border-black duration-300 "
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
