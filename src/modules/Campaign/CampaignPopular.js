import React from "react";
import CampaignItem from "./CampaignItem";

const CampaignPopular = ({ data }) => {
  return (
    <div className="mt-7">
      <CampaignItem data={data}></CampaignItem>
    </div>
  );
};

export default CampaignPopular;
