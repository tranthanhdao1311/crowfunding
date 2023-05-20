import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../components/common/Heading";
import CampaignGrid from "../../modules/Campaign/CampaignGrid";
import CampaignItem from "../../modules/Campaign/CampaignItem";
import { apiCampaigns } from "../../constants/api";

const Category = () => {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns);
      const item = response.data.filter((item) => item.category?.name === name);
      setData(item);
    }
    fetchData();
  }, [name]);
  return (
    <div className="w-full">
      <Heading>
        Category {">"} {name}
      </Heading>
      <CampaignGrid>
        {data.length > 0 &&
          data.map((item) => (
            <CampaignItem key={item.id} data={item}></CampaignItem>
          ))}
      </CampaignGrid>
    </div>
  );
};

export default Category;
