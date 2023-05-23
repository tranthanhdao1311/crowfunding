import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import CampainItemFeature from "../../modules/Campaign/CampaignItemFeature";
import CampaignGrid from "../../modules/Campaign/CampaignGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiCampaigns } from "../../constants/api";

const Campaign = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [data, setData] = useState([]);
  //  {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken} `,
  //   },
  // }
  const newData =
    user && user.id && data.filter((item) => item.infoUser.id === user.id);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns);
      setData(response.data);
    }
    fetchData();
  }, []);

  const [itemCampaign, setItemCampaign] = useState(3);

  const handleSeeMoreCampaign = () => {
    const increCampaign = itemCampaign + 1;
    setItemCampaign(increCampaign);
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-10">
        <div className="flex gap-6">
          <Link to={`/start-campaign`}>
            <div className="min-w-[60px] sm:max-w-14 h-14 cursor-pointer flex justify-center items-center bg-secondaryColor bg-opacity-60 rounded-full">
              <FontAwesomeIcon
                className="text-white"
                icon={faPlus}
              ></FontAwesomeIcon>
            </div>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-text1 dark:text-white text-lg sm:text-xl font-semibold leading-5">
              Create Your Campaign
            </h1>
            <span className="text-text3font-normal leading-5 text-xs sm:text-sm">
              Jump right into our editor and create your first Virtue campaign!
            </span>
            <span className="text-primaryColor font-normal leading-5 text-sm">
              Need any help? Learn More...
            </span>
          </div>
        </div>
        <Link to={`/start-campaign`}>
          <Button className="hidden lg:block bg-secondaryColor whitespace-nowrap bg-opacity-20 text-secondaryColor pr-7 pl-7 mr-6">
            Create campaign
          </Button>
        </Link>
      </div>
      <Heading>
        Your Campaign{" "}
        <span className="text-secondaryColor">
          {" "}
          ({newData?.length ? newData.length : 0})
        </span>
      </Heading>
      <CampaignGrid type="secondary">
        {newData?.length > 0 &&
          newData
            .slice(0, itemCampaign)
            .map((item) => (
              <CampainItemFeature
                key={item.id}
                data={item}
              ></CampainItemFeature>
            ))}
      </CampaignGrid>
      {newData?.length === 0 && (
        <span className=" text-text3 text-base">
          You don't have any campaigns yet.
        </span>
      )}
      {!user?.id && (
        <span className="text-text3 text-base">
          Login and create your campaign
        </span>
      )}
      {itemCampaign < newData?.length && (
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

export default Campaign;
