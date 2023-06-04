import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = ({ children, onClick = () => {} }) => {
  const { setShow } = useDropdown();
  const handleClickOption = () => {
    onClick();
    setShow(false);
  };
  return (
    <div
      className="px-6 py-2 text-text1 dark:text-white font-normal text-sm"
      onClick={handleClickOption}
    >
      {children}
    </div>
  );
};

export default Option;
