import React from "react";

const ButtonGoogle = ({ text, className }) => {
  return (
    <button
      className={` ${className}  dark:bg-darkSecondary dark:border-darkStroke dark:text-white flex items-center justify-center  gap-x-3 border w-full  h-[52px] py-3 font-semibold text-text2 text-[16px] border-strock rounded-xl`}
    >
      <img srcSet="/Google.png 2x" alt="" />
      {text}
    </button>
  );
};

export default ButtonGoogle;
