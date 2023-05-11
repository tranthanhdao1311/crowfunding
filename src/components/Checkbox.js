import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Checkbox = ({ checked, control, onClick, name, children }) => {
  return (
    <div className="flex items-center gap-x-5">
      <label className="w-[20px] h-[20px] shrink-0 ">
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onClick={onClick}
          className="border-0 w-[1px] h-[1px] m-[-1] overflow-hidden p-0 absolute whitespace-nowrap"
          onChange={() => {}}
        ></input>
        <div
          className={`${
            checked && "bg-primaryColor border-0"
          } w-full h-full border border-strock dark:border-text3 flex items-center justify-center cursor-pointer rounded-sm`}
        >
          {checked && (
            <FontAwesomeIcon
              className="text-white text-xs"
              icon={faCheck}
            ></FontAwesomeIcon>
          )}
        </div>
      </label>
      {children && (
        <label onClick={onClick} className="cursor-pointer ">
          {children}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
