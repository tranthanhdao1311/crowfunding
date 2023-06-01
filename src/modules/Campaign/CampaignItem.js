import React from "react";
import { Link } from "react-router-dom";
import CampaignDesc from "./CampaignDesc";
import CampaignTitle from "./CampaignTitle";
import useFormatRaised from "../../hooks/useFormatRaised";
import axios from "axios";
import { apiUrl } from "../../constants/api";

const CampaignItem = ({ data }) => {
  const vntAmount = data?.raisedAmount / 0.000043;

  const { percent, formatNumber, formatCurrentRaised } = useFormatRaised(
    data?.goal,
    vntAmount
  );

  const handCountClick = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/campaign/${data?.id}/click`,
        {}
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  if (!data) return null;
  return (
    <div
      onClick={handCountClick}
      className="w-full h-[410px] flex flex-col gap-y-4 rounded-2xl bg-white dark:bg-darkSecondary shadow-item dark:shadow-none"
    >
      <div className="w-full h-full xl:max-w-[309px] xl:h-[158px]">
        <Link to={`/campaign/${data.title}`}>
          <img
            className="w-full h-full rounded-2xl object-cover"
            srcSet={data.imageCampaign}
            alt={data.imageCampaign}
          />
        </Link>
      </div>

      <div className="w-[309px] flex flex-col pl-5 pr-9 gap-y-5">
        <div className="flex flex-col gap-y-4">
          <Link to="/" className="flex gap-x-2 items-end">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.17 2L9.17 4H18V14H2V2H7.17ZM8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2H10L8 0Z"
                fill="#808191"
              />
            </svg>
            <p
              // to={`/category/${data.category?.name}`}
              className="font-medium text-xs text-text3"
            >
              {data.category?.name}
            </p>
          </Link>
          <div className="flex flex-col gap-y-1">
            <CampaignTitle
              to={`/campaign/${data.title}`}
              className="font-semibold text-base text-text1 dark:text-white"
            >
              {data.title}
            </CampaignTitle>
            <CampaignDesc
              to={`/campaign/${data.title}`}
              className="text-xs leading-5"
            >
              {data.desc}
            </CampaignDesc>
          </div>
          <div className="flex gap-x-12">
            <div>
              <p className="text-text2 dark:text-white text-sm font-semibold leading-6">
                {formatCurrentRaised}
              </p>
              <span className="text-text4 font-normal text-xs leading-4">
                Trên tổng {formatNumber}
              </span>
            </div>
            <div>
              <p className="text-text2 text-sm font-semibold leading-6 dark:text-white">
                0
              </p>
              <span className="text-text4 font-normal text-xs leading-4 whitespace-nowrap">
                Người ủng hộ
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 items-center pb-4">
          <img className="w-[30px]" src="/avtUser.png" alt="" />
          <p className="text-xs leading-5 text-text3 font-normal">
            By{" "}
            <span className="text-text2 dark:text-white font-semibold">
              {data.infoUser.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignItem;
