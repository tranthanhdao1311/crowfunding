import React from "react";

const ButtonGoogle = ({ text }) => {
  return (
    <button className="dark:bg-darkStroke dark:border-darkStroke dark:text-white flex items-center justify-center mx-auto gap-x-3 border lg:w-[430px] w-full h-[52px] py-3 font-semibold text-text2 text-[16px] border-strock rounded-xl ">
      <img srcSet="/Google.png 2x" alt="" />
      {text}
    </button>
  );
};

export default ButtonGoogle;
