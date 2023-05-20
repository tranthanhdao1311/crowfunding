import React, { useEffect } from "react";
import HeaderAuth from "../Header/HeaderAuth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayoutAuth = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { dark } = useSelector((state) => state.darkMode);
  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user && user.email) return null;
  return (
    <div
      className={`${
        dark ? "dark" : ""
      } w-full relative min-h-screen bg-liteBg dark:bg-darkBg lg:p-10 px-6 pt-6 pb-16 isolate `}
    >
      <img
        src="/ellipse.png"
        alt="bg"
        className="absolute hidden lg:block w-full left-0 right-0 bottom-0 pointer-events-none z-[-1]"
      />
      <HeaderAuth></HeaderAuth>
      <div className="w-full  max-w-[556px] rounded-xl lg:px-12 lg:py-16 px-5 py-7 mt-3 lg:mt-0  bg-white dark:bg-darkSecondary mx-auto">
        {children}
      </div>
    </div>
  );
};

DefaultLayoutAuth.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayoutAuth;
