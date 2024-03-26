import React, { memo } from "react";

const SelectOption = ({ icon, quickview, detail, favorite }) => {
  return (
    <div className={`w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:text-white duration-300
     ${quickview && "hover:bg-green-600 hover:shadow-green-600"} 
     ${detail && "hover:bg-yellow-600 hover:shadow-yellow-600"} 
     ${favorite && "hover:bg-red-600 hover:shadow-red-600"}`} >
      {icon}
    </div>
  );
};

export default memo(SelectOption);
