import React from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return <DropdownProvider {...props}>{children}</DropdownProvider>;
};

export default Dropdown;
