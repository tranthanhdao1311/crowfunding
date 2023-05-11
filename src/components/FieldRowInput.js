import React from "react";

const FieldRowInput = ({ children }) => {
  return (
    <div className="w-full md:w-[50%] flex flex-col gap-y-2 mb-4 md:mb-0">
      {children}
    </div>
  );
};

export default FieldRowInput;
