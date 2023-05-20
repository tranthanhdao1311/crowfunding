import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import CampaignDesc from "./CampaignDesc";
import CampaignTitle from "./CampaignTitle";
import { Link } from "react-router-dom";
import useFormatRaised from "../../hooks/useFormatRaised";
import useFormatDate from "../../hooks/useFormatDate";
import { useSelector } from "react-redux";

const CampainItemFeature = ({ data }) => {
  const user = useSelector((state) => state.auth.user);
  // days left
  const { daysLeft } = useFormatDate(data);

  //  percent goal
  const { formatCurrentRaised, formatNumber, percent } = useFormatRaised(data);

  if (!data) return null;
  return (
    <>
      <div className="flex-1">
        <div className="w-full flex flex-col  gap-y-4 lg:flex-row lg:items-center lg:gap-x-7 mb-[40px]">
          <div className="w-full h-[330px] sm:max-w-[583px] ">
            <img
              className="w-full h-full rounded-3xl object-cover"
              srcSet={data.imageCampaign}
              alt={data.imageCampaign}
            />
          </div>
          <div className="w-full sm:w-[435px] flex flex-col gap-y-3">
            <div className="flex gap-x-3  ">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.17 2L9.17 4H18V14H2V2H7.17ZM8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2H10L8 0Z"
                  fill="#808191"
                />
              </svg>
              <Link
                to={`/category/${data.category?.name}`}
                className="text-text3 font-medium text-sm"
              >
                {data.category?.name}
              </Link>
            </div>
            <div className="flex flex-col gap-y-4">
              <CampaignTitle
                to={`/campaign/${data.title}`}
                className="text-text1 dark:text-white font-bold text-xl"
              >
                {data.title}
              </CampaignTitle>
              <CampaignDesc className="text-sm leading-5">
                {data.desc}
              </CampaignDesc>
            </div>
            <div>
              {percent}% of {formatNumber}
            </div>
            <div className="w-full h-[5px] block bg-[#EFEFEF] rounded-md my-2 overflow-hidden">
              <div className={`w-[${percent}%] h-full bg-primaryColor`}></div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-text2 dark:text-white pb-1 font-bold text-xl">
                  {formatCurrentRaised}
                </span>
                <p className="text-text4 font-normal">
                  Raised of <span className="font-medium">{formatNumber}</span>
                </p>
              </div>
              <div>
                <span className="block text-text2 dark:text-white pb-1 font-bold text-xl">
                  0
                </span>
                <span className="text-text4 font-normal">Total backers</span>
              </div>
              <div>
                <span className="block text-text2 dark:text-white pb-1 font-bold text-xl">
                  {daysLeft}
                </span>
                <span className="text-text4 font-normal">Days left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampainItemFeature;
