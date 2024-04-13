import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options, defaultValue }) => {
  return (
    <select
      className="form-select text-sm rounded-md"
      value={value}
      defaultValue={defaultValue} // Add defaultValue prop
      onChange={(e) => changeValue(e.target.value)}
    >
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
