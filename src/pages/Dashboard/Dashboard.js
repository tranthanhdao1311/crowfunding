import React, { useEffect, useState } from "react";

import CampainItemFeature from "../../modules/Campaign/CampaignItemFeature";
import CampaignPopular from "../../modules/Campaign/CampaignPopular";
import CampaignRecent from "../../modules/Campaign/CampaignRecent";
import Heading from "../../components/common/Heading";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCampaigns } from "../../constants/api";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [data, setData] = useState([]);

  const newData =
    user && user.id && data.filter((item) => item.infoUser.id === user.id);
  const firstNewData = newData?.[0];

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken} `,
        },
      });
      setData(response.data);
    }
    fetchData();
  }, [accessToken]);

  return (
    <div className="w-full">
      {user && user.id && (
        <div>
          <Heading>
            <Link to="/campaign">
              Your Campaign{" "}
              <span className="text-secondaryColor">({newData?.length})</span>
            </Link>
          </Heading>
          <CampainItemFeature data={firstNewData}></CampainItemFeature>
        </div>
      )}

      <CampaignPopular></CampaignPopular>
      <CampaignRecent></CampaignRecent>
    </div>
  );
};

export default Dashboard;
