import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import HeaderDashBoard from "../Header/HeaderDashBoard";

const LayoutDashboard = React.memo(({ children }) => {
  const showResult = useSelector((state) => state.campaign.showResult);
  const dark = useSelector((state) => state.darkMode.dark);

  return (
    <div
      className={` ${
        dark ? "dark" : "light"
      } relative w-full max-w-[1600px] min-h-[100vh] my-0 mx-auto p-10 bg-liteBg `}
    >
      <HeaderDashBoard></HeaderDashBoard>
      <div className=" relative flex gap-x-10">
        <SideBar></SideBar>
        {children}
      </div>
      <div
        className={`${
          showResult
            ? "w-full h-full absolute top-0 left-0 bg-text1 opacity-60 z-40 "
            : ""
        }  transition-all`}
      ></div>
    </div>
  );
});

export default LayoutDashboard;
