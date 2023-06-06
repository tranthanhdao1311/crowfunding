import React from "react";

const FieldRowInput = ({ children, className }) => {
  const flexClass = className
    ? className.includes("xl:flex")
      ? className
      : `${className} lg:flex`
    : "lg:flex";
  return (
    <div
      className={`${className} w-full xl:w-[50%] flex flex-col gap-y-2 mb-4 xl:mb-0`}
    >
      {children}
    </div>
  );
};

export default FieldRowInput;
