import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import CampaignGrid from "./CampaignGrid";
import CampaignItem from "./CampaignItem";
import axios from "axios";

const CampaignSimilar = ({ data }) => {
  const [campaign, setCampaign] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:4001/campaigns");
      const item = response.data.filter((item) => item.category?.name === data);
      setCampaign(item);
    }
    fetchData();
  }, [data]);
  return (
    <div className="mt-7">
      <Heading>You also may be interested in</Heading>
      <CampaignGrid>
        {campaign.length > 0 &&
          campaign.map((item) => <CampaignItem data={item}></CampaignItem>)}
      </CampaignGrid>
    </div>
  );
};

export default CampaignSimilar;
