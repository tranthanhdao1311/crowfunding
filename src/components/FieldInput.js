import React from "react";

const FieldInput = ({ children, className }) => {
  const flexClass = className
    ? className.includes("xl:flex")
      ? className
      : `${className} lg:flex`
    : "lg:flex";

  return (
    <div className={`${className} w-full xl:flex  xl:gap-x-11  mb-5`}>
      {children}
    </div>
  );
};

export default FieldInput;
