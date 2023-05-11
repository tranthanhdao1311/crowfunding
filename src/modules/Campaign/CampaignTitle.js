import React from "react";
import { Link } from "react-router-dom";

const CampaignTitle = ({ children, className, to }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default CampaignTitle;
