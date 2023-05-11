import React from "react";
import PropTypes from "prop-types";

const HeadingAuth = ({ title }) => {
  return (
    <div className="text-center">
      <div className="inline-block font-semibold text-xl px-3 text-text1 dark:text-white pb-3">
        {title}
      </div>
    </div>
  );
};

HeadingAuth.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadingAuth;
