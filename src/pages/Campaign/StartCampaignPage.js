import React from "react";
import CampaignAddNew from "../../modules/Campaign/CampaignAddNew";
import RequiredAuthPage from "../../modules/Auth/RequiredAuthPage";

const StartCampaignPage = () => {
  return (
    <RequiredAuthPage>
      <div className="flex-1 w-full">
        <CampaignAddNew></CampaignAddNew>
      </div>
    </RequiredAuthPage>
  );
};

export default StartCampaignPage;
