import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options, defaultValue }) => {
  return (
    <select
      className="form-select font-mono text-sm font-semibold focus:ring-0 focus:border-black"
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
