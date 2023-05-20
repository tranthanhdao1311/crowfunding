import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ placeholder = "", control, name, type }) => {
  const { field } = useController({ control, name });
  return (
    <textarea
      name={name}
      type={type}
      id="desc"
      placeholder={placeholder}
      {...field}
      className="w-full dark:bg-darkBg dark:border-darkStroke resize-none h-[150px] border outline-0 px-6 py-4 rounded-xl placeholder:text-text4 text-sm placeholder:text-sm"
    ></textarea>
  );
};

export default TextArea;
