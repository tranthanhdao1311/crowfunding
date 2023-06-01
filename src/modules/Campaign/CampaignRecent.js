import React from "react";
import Heading from "../../components/common/Heading";
import CampaignGrid from "./CampaignGrid";
import CampaignItem from "./CampaignItem";

const CampaignRecent = ({ data }) => {
  return (
    <div className="mt-7">
      <CampaignItem data={data}></CampaignItem>
    </div>
  );
};

export default CampaignRecent;
