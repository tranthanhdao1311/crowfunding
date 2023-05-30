import React from "react";

const FieldRowInput = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full lg:w-[50%] flex flex-col gap-y-2 mb-4 lg:mb-0`}
    >
      {children}
    </div>
  );
};

export default FieldRowInput;
