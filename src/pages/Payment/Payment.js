import React, { useState } from "react";
import Button from "../../components/Button/Button";

const Payment = () => {
  //grid-cols-[repeat(2,minmax(0,1fr))
  return (
    <div className="w-full pt-[60px] max-w-[624px] mx-auto text-center">
      <h1 className="font-bold text-[25px] mb-3">
        Kết nối bộ xử lý thanh toán của bạn
      </h1>
      <p className="text-text3 text-base mb-[60px]">
        Để bắt đầu xử lý các khoản thanh toán và quyên góp bằng thẻ tín dụng,
        bạn sẽ cần chọn Paypal hoặc Payoneer{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] md:space-x-10">
        <div className="bg-white dark:bg-darkSecondary shadow-lg flex flex-col justify-center items-center mb-5 md:mb-0  pt-[35px] px-6 pb-6 rounded-2xl w-full">
          <img srcSet="SeekPng1@2x.png 2x" alt="" className="mb-10" />
          <p className="mb-6 text-sm text-text3">
            Được thanh toán trực tiếp qua Paypal.
          </p>
          <Button className="w-full bg-secondaryColor2 dark:bg-secondaryColor  text-secondaryColor dark:text-white">
            Kết nối
          </Button>
        </div>
        <div className="bg-white dark:bg-darkSecondary shadow-lg flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full">
          <img srcSet="SeekPng1.png 2x" alt="" className="mb-10" />
          <p className="mb-6 text-sm text-text3">
            Được trả tiền trên toàn thế giới Công việc của bạn.
          </p>
          <Button className="w-full text-secondaryColor dark:bg-secondaryColor dark:text-white  bg-secondaryColor2">
            Kết nối
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
