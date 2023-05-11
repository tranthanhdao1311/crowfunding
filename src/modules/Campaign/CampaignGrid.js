import React from "react";

const CampaignGrid = ({ children, type = "default" }) => {
  if (type !== "default")
    return <div className="grid grid-cols-1 gap-y-10">{children}</div>;
  return (
    <div className=" grid md:grid-cols-2 xl:grid-cols-4 gap-x-7 gap-y-7">
      {children}
    </div>
  );
};

export default CampaignGrid;
