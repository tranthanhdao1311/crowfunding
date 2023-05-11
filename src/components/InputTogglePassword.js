import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePassword } from "../store/campaign/slice";
import Input from "./Input";
import PropTypes from "prop-types";

const InputTogglePassword = ({ control, id, error, name, placeholder }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        control={control}
        type={showPass ? "text" : "password"}
        placeholder={placeholder}
        name="password"
        className={error ? "border-error dark:border-error font-medium" : ""}
      >
        {showPass ? (
          <FontAwesomeIcon
            className="absolute right-5 text-iconColor dark:text-text2 cursor-pointer "
            icon={faEye}
            onClick={() => {
              setShowPass(false);
            }}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            className="absolute right-5 text-iconColor dark:text-text2  cursor-pointer"
            icon={faEyeSlash}
            onClick={() => {
              setShowPass(true);
            }}
          ></FontAwesomeIcon>
        )}
      </Input>
      <p className=" font-medium text-xs text-error  pointer-events-none  pt-1 ">
        {error}
      </p>
    </div>
  );
};

export default InputTogglePassword;
