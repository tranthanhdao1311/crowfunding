import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children, onClick = () => {} }) => {
  const { show } = useDropdown();

  return (
    <div className="absolute w-full left-0 top-16 z-10">
      {show && (
        <div className="w-full max-h-[250px] cursor-pointer bg-white dark:bg-darkSecondary  shadow-xl overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default List;
