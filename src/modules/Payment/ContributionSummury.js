import React, { useEffect, useState } from "react";
import useFormatRaised from "../../hooks/useFormatRaised";
import Checkbox from "../../components/Checkbox";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../constants/api";
import { PayPalButton } from "react-paypal-button-v2";
import Button from "../../components/Button/Button";
import ReactModal from "react-modal";

const ContributionSummury = ({
  dataCampaign,
  dataParent,
  price = 0,
  error,
  value,
  editAddress,
  editPhone,
}) => {
  const [showPaypal, setShowPaypal] = useState(false);
  useEffect(() => {
    if (!dataCampaign.monthYearShip) {
      setShowPaypal(true);
    }
  }, [dataCampaign.monthYearShip]);
  const navigate = useNavigate();
  const { formatNumber } = useFormatRaised(dataCampaign?.price || price);
  const { watch, setValue } = useForm();
  const watchAgree = watch("statusAgree");
  const vndToUsdRate = 0.000043; // Tỷ giá hối đoái từ VND sang USD
  const vndAmount = dataCampaign?.price || price; // Giá trị VND cần chuyển đổi
  const usdAmount = vndAmount * vndToUsdRate; // Chuyển đổi sang USD

  return (
    <div className="w-full lg:w-[400px]  xl:w-[462px] shadow-md bg-white dark:bg-darkSoft  rounded-3xl pt-4 pb-10 px-5">
      <h3 className="mt-3 mb-6 text-lg font-semibold leading-normal text-text2 dark:text-text4">
        Tóm tắt đóng góp
      </h3>
      <div className=" ">
        <div className="">
          <div className="flex items-center px-5 py-4 mb-4  rounded-xl bg-secondaryColor bg-opacity-5 gap-x-4">
            {dataCampaign?.image && (
              <img
                src={dataCampaign?.image}
                alt=""
                className="flex-shrink-0 object-cover rounded w-[89px] h-[70px]"
              />
            )}

            <h4 className="text-base font-medium max-w-[200px] whitespace-normal">
              {dataCampaign?.title}
            </h4>
            <span className="ml-auto text-base font-bold">{formatNumber}</span>
          </div>
          <div className="px-5">
            <div className="flex items-center justify-between mb-3 text-base font-medium text-text2 dark:text-white">
              <span>Tổng phụ</span>
              <span>{formatNumber}</span>
            </div>
            <div className="flex items-center justify-between mb-6 text-base font-medium text-text2 dark:text-white">
              <span>Phí vận chuyển</span>
              <p>Miễn phí</p>
            </div>
            <div className="flex items-center justify-between text-base font-bold uppercase pb-6 border border-x-0 border-t-0 border-[#ccc] ">
              <span>Tổng tiền</span>
              <span>{formatNumber}</span>
            </div>
          </div>
        </div>

        <div className="px-5 ">
          <div className="text-xs text-text1 dark:text-white p-4 flex flex-col gap-y-3 my-0 lg:my-6 border border-[#ccc]">
            <p className="font-semibold text-base">
              Crowdfunding không phải là mua sắm.
            </p>
            <p>
              Đóng góp của bạn là một cách để hỗ trợ một doanh nhân, nhưng không
              đảm bảo rằng bạn sẽ nhận được đặc quyền.
            </p>
            <p>
              Mọi khoản hoàn trả sau ngày 1 tháng 6 năm 2023 đều thuộc trách
              nhiệm của chủ sở hữu chiến dịch, Crowdfunding, theo quyết định của
              họ.
            </p>
          </div>
          <div className="mb-6 mt-4">
            <Checkbox
              name="term"
              checked={watchAgree === true}
              onClick={() => {
                setValue("statusAgree", !watchAgree);
              }}
            >
              <p className="h-[56px] font-normal lg:text-xs text-xs  text-text1 dark:text-text3 py-3 lg:pr-5 pr-3 ">
                Tôi đồng ý với{" "}
                <Link to="/" className="text-secondaryColor underline">
                  Điều khoản sử dụng
                </Link>{" "}
                và đã đọc và hiểu{" "}
                <Link to="/" className="text-secondaryColor underline ">
                  Chính sách quyền riêng tư
                </Link>
              </p>
            </Checkbox>
          </div>
          {/* <Button onClick={handleClick} className="bg-black">
          Buy
        </Button> */}
          {/* showPaypal && */}
          {((dataCampaign.monthYearShip &&
            value.address &&
            value.phone &&
            !editAddress &&
            !editPhone) ||
            showPaypal) && (
            <PayPalButton
              amount={Number(usdAmount.toFixed(2))}
              onSuccess={(details, data) => {
                // alert(
                //   "Transaction completed by " + details.payer.name.given_name
                // );
                navigate("end", {
                  state: { value, dataCampaign, formatNumber, dataParent },
                });
                return axios.put(
                  `${apiUrl}/api/campaigns/${dataParent.id}/add-amount`,

                  { amount: usdAmount }
                );
              }}
              options={{
                clientId:
                  "AbsuQWHyF68P2xTioYiXREERj3yxrJzg-9hTUjurNg7ljdN1EB2vklR3T16q9sGAx1O8cLVn8H7GNDgB",
              }}
              onError={() => {
                alert("Paypal error");
              }}
            />
          )}
          {/* <PayPalButton
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "0.01",
                  },
                },
              ],
              // application_context: {
              //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
              // }
            });
          }}
          onApprove={(data, actions) => {
            // Capture the funds from the transaction
            return actions.order.capture().then(function (details) {
              // Show a success message to your buyer
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );

              // OPTIONAL: Call your server to save the transaction
              return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });
            });
          }}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default ContributionSummury;
