import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import CampaignDesc from "./CampaignDesc";
import CampaignTitle from "./CampaignTitle";
import { Link, useNavigate } from "react-router-dom";
import useFormatRaised from "../../hooks/useFormatRaised";
import useFormatDate from "../../hooks/useFormatDate";
import { useSelector } from "react-redux";
import Skeleton from "../../components/Skeleton/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import axios from "axios";
import { apiCampaigns, apiUrl } from "../../constants/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CampainItemFeature = ({ data, onDeletePost }) => {
  const user = useSelector((state) => state.auth.user);
  const { dark } = useSelector((state) => state.darkMode);
  // days left
  const { daysLeft } = useFormatDate(data);
  const navigate = useNavigate();

  //  percent goal
  const { formatCurrentRaised, formatNumber, percent } = useFormatRaised(
    data.goal
  );

  const handleCreatePerk = (id) => {
    navigate(`/campaign/addperk/${id}`);
  };
  const handleUpdateItem = (id) => {
    navigate(`/campaign/update/${id}`);
  };

  const [toggleOptions, setToggleOptions] = useState(false);
  const handleToggleOption = () => {
    setToggleOptions((prev) => !prev);
  };

  const handleDeleteItem = async () => {
    setToggleOptions(false);
    Swal.fire({
      title: "Xóa chiến dịch",
      text: `Id: ${data.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        async function docData() {
          try {
            await axios.delete(`${apiUrl}/api/campaigns/${data.id}`);
            onDeletePost(data.id);
          } catch (error) {
            toast.error(`Không thể xóa bài viết id: ${data.id} vào thùng rác!`);
          }
        }
        docData();

        Swal.fire(
          "Xóa chiến dịch thành công",
          `Bạn đã xóa chiến dịch: ${data.id} thành công!`,
          "success"
        );
      }
    });
  };

  return (
    <>
      <div className="flex-1">
        <div className="w-full flex flex-col  gap-y-4 lg:flex-row lg:items-center lg:gap-x-7 mb-[40px]">
          <div className="w-full h-[330px] sm:max-w-[583px] ">
            <img
              className="w-full h-full rounded-3xl object-cover"
              srcSet={data?.imageCampaign}
              alt={data?.imageCampaign}
            />
          </div>
          <div className="w-full sm:w-[435px] flex flex-col gap-y-3">
            <div className="flex justify-between gap-x-3">
              <div className="flex gap-x-2">
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
                  to={`/category/${data?.category?.name}`}
                  className="text-text3 font-medium text-sm"
                >
                  {data?.category?.name}
                </Link>
              </div>

              <Tippy
                interactive
                placement="bottom-end"
                visible={toggleOptions}
                render={(attrs) => (
                  <div
                    className="cursor-pointer w-[150px] text-text1 py-4 text-sm bg-white dark:bg-darkSecondary dark:text-white shadow-lg rounded-lg"
                    tabIndex="-1"
                    {...attrs}
                  >
                    <ul className="">
                      <li
                        className="dark:hover:bg-darkStroke hover:bg-primaryColor2 py-3 px-4"
                        onClick={() => handleCreatePerk(data.id)}
                      >
                        Tạo đặc quyền
                      </li>
                      <li
                        className="dark:hover:bg-darkStroke hover:bg-primaryColor2 py-3 px-4"
                        onClick={() => handleUpdateItem(data.id)}
                      >
                        Chỉnh sửa
                      </li>
                      <li
                        className="dark:hover:bg-darkStroke hover:bg-primaryColor2 py-3 px-4"
                        onClick={() => handleDeleteItem(data.id)}
                      >
                        Xóa bài viết
                      </li>
                    </ul>
                  </div>
                )}
              >
                <div
                  onClick={() => handleToggleOption()}
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-text3"
                    icon={faEllipsis}
                  ></FontAwesomeIcon>
                </div>
              </Tippy>
            </div>
            <div className="flex flex-col gap-y-4">
              <CampaignTitle
                to={`/campaign/${data?.title}`}
                className="text-text1 dark:text-white font-bold text-xl"
              >
                {data?.title}
              </CampaignTitle>
              <CampaignDesc className="text-sm leading-5">
                {data?.desc}
              </CampaignDesc>
            </div>
            <div>
              {percent}% of {formatNumber}
            </div>
            <div className="w-full h-[5px] block bg-[#EFEFEF] rounded-md my-2 overflow-hidden">
              <div
                style={{ width: `${percent}%` }}
                className={` h-full bg-primaryColor`}
              ></div>
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

export const SkeletonCampaignItem = () => {
  return (
    <>
      <div className="flex-1">
        <div className="w-full flex flex-col  gap-y-4 lg:flex-row lg:items-center lg:gap-x-7 mb-[40px]">
          <div className="w-full h-[330px] sm:max-w-[583px] ">
            <Skeleton className="w-full h-full rounded-3xl"></Skeleton>
          </div>
          <div className="w-full sm:w-[435px] flex flex-col gap-y-3">
            <Skeleton className="w-[100px] h-[20px] rounded-xl"></Skeleton>
            <Skeleton className="w-full h-[40px] rounded-xl"></Skeleton>
            <Skeleton className="w-full h-[50px] rounded-xl"></Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};
