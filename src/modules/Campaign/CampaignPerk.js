import React from "react";
import Heading from "../../components/common/Heading";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";

const CampaignPerk = ({ showButton = false }) => {
  const showModal = useSelector((state) => state.campaign.showModal);
  const dispatch = useDispatch();
  return (
    <>
      <div className="shadow-lg rounded-lg mb-8">
        <img
          className="w-full rounded-xl h-[232px] object-cover"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <div className="p-5">
          <span className="bg-secondaryColor w-[55px] h-[18px] text-xs text-white px-3 py-1">
            Feature
          </span>
          <div className="flex flex-col gap-y-4">
            <div>
              <Heading className="mb-0">Special One Camera</Heading>
              <div className="flex items-center gap-x-3 font-medium">
                <p className="text-text1 text-xl">$2,724 USD</p>
                <p className="text-[#EB5757]">$1,504 USD (12% OFF)</p>
              </div>
            </div>
            <div>
              <p className="text-text1 text-base font-medium">
                Estimated Shipping
              </p>
              <p className="text-text2 text-sm">October 2022</p>
            </div>
            <div>
              <span className="text-text1 text-sm">05</span>{" "}
              <span className="text-text2 text-sm">claimed</span>
            </div>
            <p className="text-text2 text-sm">Ships worldwide</p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="mb-12">
          <Button className="bg-secondaryColor w-full">Get this perk</Button>
        </div>
      )}
    </>
  );
};

export default CampaignPerk;
