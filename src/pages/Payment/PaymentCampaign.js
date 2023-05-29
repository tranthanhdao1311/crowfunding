import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import PaymentMethod from "../../modules/Payment/PaymentMethod";
import ContributionSummury from "../../modules/Payment/ContributionSummury";

const PaymentCampaign = () => {
  const { id } = useParams();
  const location = useLocation();
  const dataParent = location.state || {};
  const dataChild = dataParent.campaignData?.perk.filter(
    (item) => item.id === id
  );
  console.log(dataChild);
  if (id === "undefined") return null;
  return (
    <div className="w-full flex items-start gap-x-96">
      <div>
        <h2 className="font-bold text-[30px] leading-normal mb-10">
          Thanh toán
        </h2>
        <PaymentMethod></PaymentMethod>
      </div>
      <div className=" max-w-[462px]">
        <ContributionSummury data={dataChild}></ContributionSummury>
      </div>
    </div>
  );
};

export default PaymentCampaign;
