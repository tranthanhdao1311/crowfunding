import React from "react";
import Heading from "../../components/common/Heading";
import CampaignGrid from "./CampaignGrid";
import CampaignItem from "./CampaignItem";

const CampaignRecent = () => {
  return (
    <div className="mt-7">
      <Heading>Chiến dịch gần đây</Heading>
      <CampaignGrid>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
        <CampaignItem></CampaignItem>
      </CampaignGrid>
    </div>
  );
};

export default CampaignRecent;
