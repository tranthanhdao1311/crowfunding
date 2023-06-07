import React from "react";
import PropTypes from "prop-types";
import Loading from "../Loading";

const Button = ({
  children,
  onClick = () => {},
  className = "",
  loading,
  ...props
}) => {
  const child = !!loading ? <Loading></Loading> : children;
  return (
    <button
      onClick={onClick}
      className={`${className}  h-[52px]  text-white font-semibold py-3 rounded-xl`}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
