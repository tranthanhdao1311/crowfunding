import React from "react";
import Heading from "../../components/common/Heading";
import CampaignItem from "./CampaignItem";
import CampaignGrid from "./CampaignGrid";

const CampaignPopular = () => {
  return (
    <div className="mt-7">
      <Heading>Popular Campaign</Heading>
      <CampaignGrid>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
      </CampaignGrid>
    </div>
  );
};

export default CampaignPopular;
