import React, { useState } from "react";
import Heading from "../../components/common/Heading";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import useFormatRaised from "../../hooks/useFormatRaised";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CampaignPerk = ({ data, campaignData }) => {
  const { formatNumber } = useFormatRaised(data.price);
  const { formatNumber: formatRetailPrice } = useFormatRaised(data.retailPrice);
  const date = data.monthYearShip;
  const formatDate = moment(date).format("MM/YYYY");
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const handleShowButton = () => {
    setShowButton(true);
    if (showButton) {
      navigate(`payment/${data.id}`, { state: { campaignData } });
    }
  };
  return (
    <>
      <div
        className="hover:shadow-lg border hover:border-[#ccc] rounded-lg mb-8 cursor-pointer"
        onClick={handleShowButton}
      >
        {data.image && (
          <img
            className="w-full rounded-xl h-[232px] object-cover"
            src={data.image}
            alt=""
          />
        )}

        <div className="p-5">
          {/* <span className="bg-secondaryColor w-[55px] h-[18px] text-xs text-white px-3 py-1">
            Feature
          </span> */}
          <div className="flex flex-col gap-y-4">
            <div>
              <Heading className="mb-0">{data.title}</Heading>
              <div className="flex items-center gap-x-3 font-medium">
                <p className="text-text1 text-xl">{formatNumber}</p>
                {data.retailPrice && (
                  <p className="text-[#EB5757] line-through">
                    {formatRetailPrice}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="text-text1 text-base font-medium">
                Dự tính vận chuyển
              </p>
              <p className="text-text2 text-sm">{formatDate}</p>
            </div>
            <div>
              <span className="text-text2 text-sm">Số lượng</span>{" "}
              <span className="text-text1 text-sm">{data.quantity}</span>
            </div>
            {/* <p className="text-text2 text-sm">Ships worldwide</p> */}
          </div>
          {showButton && (
            <div className=" text-center my-4">
              <Button className="bg-secondaryColor w-[90%] ">
                Nhận đặc quyền này
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CampaignPerk;
