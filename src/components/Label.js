import React from "react";
import PropTypes from "prop-types";

const Label = ({ children, htmlFor = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-medium text-sm text-text2 dark:text-text3 py-2 cursor-pointer"
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
