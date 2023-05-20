import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequiredAuthPage = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (!user || !user.id) {
    navigate("/sign-in");
  }

  return <>{children}</>;
};

export default RequiredAuthPage;
