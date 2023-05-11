import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignItem from "../../modules/Campaign/CampaignItem";
import CampaignGrid from "../../modules/Campaign/CampaignGrid";
import Heading from "../../components/common/Heading";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setShowResult } from "../../store/campaign/slice";

const ResultsCampaignSearch = () => {
  const dispatch = useDispatch();
  dispatch(setShowResult(false));
  const params = useParams();
  const { value } = params;

  const [results, setResults] = useState([]);
  const [paging, setPaging] = useState(8);

  const handleSeeMoreCampaign = () => {
    const increCampaign = paging + 4;
    setPaging(increCampaign);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4001/campaigns");
        const item = response.data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(item);
      } catch (error) {}
    }
    fetchData();
  }, [value]);
  return (
    <div>
      <Heading>
        Found {results.length} campaign for keyword '{value}'
      </Heading>
      <CampaignGrid>
        {results.length > 0 &&
          results
            .slice(0, paging)
            .map((item) => (
              <CampaignItem key={item.id} data={item}></CampaignItem>
            ))}
      </CampaignGrid>
      {paging < results.length && (
        <div className="text-center">
          <Button
            type="button"
            onClick={() => handleSeeMoreCampaign()}
            className="bg-secondaryColor bg-opacity-20 text-secondaryColor px-6 my-6 sm:px-10 sm:my-10"
          >
            See more
            <FontAwesomeIcon
              className="ml-2 text-xs"
              icon={faPlus}
            ></FontAwesomeIcon>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsCampaignSearch;
