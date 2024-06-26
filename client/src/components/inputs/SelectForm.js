import React, { memo } from "react";
import clsx from "clsx";

const SelectForm = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  pitchOwn,
  defaultValue,
}) => {
  return (
    <div className={clsx("flex flex-col h-[42px] gap-2", style)}>
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}:
        </label>
      )}
      <select
        className={clsx(
          "form-select text-sm rounded-lg",
          fullWidth && "w-full",
          style
        )}
        id={id}
        {...register(id, validate)}
      >
        {defaultValue && <option value={defaultValue}>All</option>}
        {pitchOwn && (
          <option selected="selected" value={pitchOwn._id}>
            {pitchOwn.firstname} {pitchOwn.lastname}
          </option>
        )}
        {options?.map((el, index) => (
          <option key={index} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-sx text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(SelectForm);
