import axios from "axios";
import React, { useEffect, useState } from "react";

const useFormatRaised = (data) => {
  const [percent, setPercent] = useState(0);
  const [formatNumber, setFomatNumber] = useState(0);
  const [formatCurrentRaised, setFormatCurrentRaised] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const goal = Number(data);
      const currentRaised = 902000000;
      const formatCurrentRaised1 = currentRaised.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      setFormatCurrentRaised(formatCurrentRaised1);

      const formattedNumber = goal?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      setFomatNumber(formattedNumber);
      const percentGoal = Number(Math.ceil((currentRaised / goal) * 100));
      setPercent(percentGoal);
    }
    fetchData();
  }, [data]);

  return {
    percent,
    formatNumber,
    formatCurrentRaised,
  };
};

export default useFormatRaised;
