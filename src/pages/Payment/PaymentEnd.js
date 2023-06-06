import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "autoprefixer";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";

const PaymentEnd = () => {
  const location = useLocation();
  const dataUser = location.state?.value;
  const dataCampaign = location.state?.dataCampaign;
  const price = location.state?.formatNumber;
  const dataParent = location.state?.dataParent;

  if (!dataUser || !dataCampaign) return "404 Found";

  return (
    <div className="flex w-full h-full justify-center mt-10 md:mt-32">
      <div className="flex flex-col items-center gap-y-4 ">
        <FontAwesomeIcon
          className="text-center mb-3 p-5 rounded-full text-3xl bg-primaryColor text-white"
          icon={faCheck}
        ></FontAwesomeIcon>
        {dataCampaign.monthYearShip && (
          <p className="text-sm md:text-base">
            Bạn đã chọn đặc quyền{" "}
            <span className="font-semibold">"{dataCampaign?.title}"</span>, thời
            gian giao hàng là{" "}
            <span className="font-semibold">{dataCampaign.monthYearShip}</span>
          </p>
        )}
        <p className="text-sm md:text-base">
          Cám ơn bạn đã đóng góp <span className="font-semibold">{price}</span>{" "}
          cho chiến dịch{" "}
          <span className="text-text1 font-semibold dark:text-white">
            "{dataParent?.title}"
          </span>{" "}
          giúp chiến dịch sớm hoàn thành, chúc bạn một ngày tốt lành!
        </p>
        <Link to="/">
          <Button className="bg-secondaryColor px-5 mt-7">Trang chủ</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentEnd;
