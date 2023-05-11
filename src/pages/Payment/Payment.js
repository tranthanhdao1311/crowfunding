import React, { useState } from "react";
import Button from "../../components/Button/Button";

const Payment = () => {
  //grid-cols-[repeat(2,minmax(0,1fr))
  return (
    <div className="w-full pt-[60px] max-w-[624px] mx-auto text-center">
      <h1 className="font-bold text-[25px] mb-3">
        Connect Your Payment Processor
      </h1>
      <p className="text-text3 text-base mb-[60px]">
        To Start Processing credit card payments and donations, you will need to
        select either Paypal or Payoneer{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] md:space-x-10">
        <div className="bg-white shadow-lg flex flex-col justify-center items-center mb-5 md:mb-0  pt-[35px] px-6 pb-6 rounded-2xl w-full">
          <img srcSet="SeekPng1@2x.png 2x" alt="" className="mb-10" />
          <p className="mb-6 text-sm text-text3">
            Get paid directly via Paypal.
          </p>
          <Button className="w-full bg-secondaryColor2 text-secondaryColor">
            Connect
          </Button>
        </div>
        <div className="bg-white shadow-lg flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full">
          <img srcSet="SeekPng1.png 2x" alt="" className="mb-10" />
          <p className="mb-6 text-sm text-text3">
            Get paid worldwide your Work.
          </p>
          <Button className="w-full text-secondaryColor bg-secondaryColor2">
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
