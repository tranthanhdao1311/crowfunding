import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import CampaignGrid from "./CampaignGrid";
import CampaignItem from "./CampaignItem";
import axios from "axios";
import { apiCampaigns } from "../../constants/api";

const CampaignSimilar = ({ data }) => {
  const [campaign, setCampaign] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns);
      const item = response.data.filter((item) => item.category?.name === data);
      setCampaign(item);
    }
    fetchData();
  }, [data]);

  if (!data) return null;
  return (
    <div className="mt-7">
      <Heading>You also may be interested in</Heading>
      <CampaignGrid>
        {campaign.length > 0 &&
          campaign.map((item) => (
            <CampaignItem key={item.id} data={item}></CampaignItem>
          ))}
      </CampaignGrid>
    </div>
  );
};

export default CampaignSimilar;
