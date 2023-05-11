import React from "react";
import { Link } from "react-router-dom";

const CampaignDesc = ({ children, className = "", to }) => {
  return (
    <Link to={to} className={`${className} font-normal text-text3`}>
      {children}
    </Link>
  );
};

export default CampaignDesc;
