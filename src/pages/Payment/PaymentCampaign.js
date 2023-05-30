import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import PaymentMethod from "../../modules/Payment/PaymentMethod";
import ContributionSummury from "../../modules/Payment/ContributionSummury";

const PaymentCampaign = () => {
  const { id } = useParams();
  const location = useLocation();

  const dataParent = location?.state.campaignData || location?.state.detailPost;
  const dataPrice = location.state.valueAmount;
  const dataChild = dataParent?.perk.find((item) => item.id === id);
  // const dataChild1 = dataParent.id === id;

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
        <ContributionSummury
          dataParent={dataParent}
          data={dataChild || dataParent}
          price={dataPrice}
        ></ContributionSummury>
      </div>
    </div>
  );
};

export default PaymentCampaign;
