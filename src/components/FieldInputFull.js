import React from "react";

const FieldInputFull = ({ children, className }) => {
  return (
    <div className={`w-full flex flex-col gap-y-2 my-6 ${className}`}>
      {children}
    </div>
  );
};

export default FieldInputFull;
