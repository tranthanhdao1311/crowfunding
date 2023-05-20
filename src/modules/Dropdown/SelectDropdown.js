import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDropdown } from "./dropdown-context";

const SelectDropdown = ({ placeholder = "", control, children }) => {
  const { show, handleToggleDropdown } = useDropdown();
  return (
    <div className="relative">
      <div
        control={control}
        onClick={handleToggleDropdown}
        name="category"
        className="w-full relative cursor-pointer flex justify-between bg-white dark:bg-darkBg dark:text-text4 dark:border-darkStroke placeholder:dark:text-text2 placeholder:text-text4 text-text1 border  outline-none px-6 py-4 leading-5 text-sm rounded-xl"
      >
        <span>{placeholder}</span>
        <span>
          {show ? (
            <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
          )}
        </span>
      </div>
      {children}
    </div>
  );
};

export default SelectDropdown;
