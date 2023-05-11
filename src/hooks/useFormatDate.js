import React from "react";

const useFormatDate = (data) => {
  // days left
  //   const miliStartDate = Date.parse(data?.startDate);
  const miliEndDate = Date.parse(data?.endDate);
  const currentDate = new Date().getTime();
  const miliDaysLeft = miliEndDate - currentDate;
  const daysLeft = Math.ceil(miliDaysLeft / 86400000);
  return { daysLeft };
};

export default useFormatDate;
