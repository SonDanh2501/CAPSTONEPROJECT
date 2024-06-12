import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options, defaultValue }) => {
  return (
    <select
      className="form-select font-mono text-sm font-semibold"
      value={value}
      defaultValue={defaultValue} // Add defaultValue prop
      onChange={(e) => changeValue(e.target.value)}
    >
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          <span className="font-bold">{el.text}</span>
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
