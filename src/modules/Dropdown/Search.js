import React from "react";

const Search = ({ placeholder, className, onChange }) => {
  return (
    <div className="sticky top-0">
      <input
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        className={`border  w-full py-3 px-6 text-text1 dark:text-white dark:border-darkBg text-sm rounded-lg bg-white dark:bg-darkSoft outline-none ${className}`}
      ></input>
    </div>
  );
};

export default Search;
