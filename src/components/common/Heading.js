import React from "react";

const Heading = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold leading-7 py-2 mb-5 ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;
