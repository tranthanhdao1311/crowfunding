import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Input = ({
  type,
  id,
  name,
  placeholder,
  control,
  children,
  onChange,
  error,
  className,
}) => {
  const { field } = useController({ name, control });

  return (
    <div className="relative">
      <div className={` relative flex items-center `}>
        <input
          id={id}
          autoComplete="off"
          className={`${
            children ? "pr-12" : "pr-6"
          } w-full bg-white dark:bg-darkBg dark:text-white dark:border-darkStroke placeholder:dark:text-text4 placeholder:text-text4 text-text4 border  outline-none pl-6 py-4 leading-5 text-sm rounded-xl ${
            error ? "border-error text-error dark:border-error font-medium" : ""
          } ${className}`}
          type={type}
          placeholder={placeholder}
          onChange={() => {}}
          {...field}
        />
        {children}
      </div>
      <span
        className={`font-medium text-xs text-error pt-1 pointer-events-none`}
      >
        {error}
      </span>
    </div>
  );
};

Input.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
