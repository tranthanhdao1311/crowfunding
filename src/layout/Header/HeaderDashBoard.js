import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import DashboardSearch from "../../modules/dashboard/DashboardSearch";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { setToggleSideBar } from "../../store/campaign/slice";

const HeaderDashBoard = () => {
  const user = useSelector((state) => state.auth.user);

  const { toggleSideBar } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  const handleToggleSideBar = () => {
    dispatch(setToggleSideBar(!toggleSideBar));
  };

  return (
    <div className="flex justify-between items-center h-[40px] md:h-[52px] mb-8 px-3 relative">
      <div className=" flex gap-x-6 justify-between items-center ">
        {toggleSideBar ? (
          <Link
            to="/"
            className="md:hidden m:w-[52px] sm:h-[52px] flex-shrink-0"
          >
            <img
              className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px]"
              src="/Logo.png"
              alt=""
            />
          </Link>
        ) : (
          <div
            className="cursor-pointer md:hidden"
            onClick={() => handleToggleSideBar()}
          >
            <FontAwesomeIcon
              className="text-text3 w-[20px] h-[20px]"
              icon={faBars}
            ></FontAwesomeIcon>
          </div>
        )}
        <Link
          to="/"
          className="hidden md:block m:w-[52px] sm:h-[52px] flex-shrink-0"
        >
          <img
            className="w-[40px] h-[40px] sm:w-[52px] sm:h-[52px]"
            src="/Logo.png"
            alt=""
          />
        </Link>

        {toggleSideBar ? (
          <Link to={`/start-campaign`}>
            <Button
              type="button"
              className="basic-2/6 h-[40px] md:hidden sm:h-[52px] bg-secondaryColor  px-5 lg:px-7 text-sm lg:text-base mt-0 whitespace-nowrap"
            >
              Bắt đầu chiến dịch
            </Button>
          </Link>
        ) : (
          <div className="w-[190px] md:w-[450px] z-50">
            <DashboardSearch
              type="text"
              name="search"
              placeholder="Tìm kiếm..."
            ></DashboardSearch>
          </div>
        )}

        {toggleSideBar && (
          <div className="w-[190px] md:w-[450px] z-50 hidden md:block">
            <DashboardSearch
              type="text"
              name="search"
              placeholder="Tìm kiếm..."
            ></DashboardSearch>
          </div>
        )}
      </div>
      <div className="flex md:gap-x-10 items-center justify-between ">
        <div className="basic-2/6 hidden xl:flex lg:gap-x-2 lg:items-center cursor-pointer">
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2.293L11.707 6.586L7.707 2.586L0 10.293L1.414 11.707L7.707 5.414L11.707 9.414L17.414 3.707L19.707 6V0H13.707L16 2.293Z"
              fill="#A2A2A8"
            />
          </svg>

          <span className="font-semibold text-base text-text2 dark:text-text4 whitespace-nowrap">
            Gây quỹ
          </span>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L11 1" stroke="#A2A2A8" strokeWidth="2" />
          </svg>
        </div>

        <Link to={`/start-campaign`}>
          <Button
            type="button"
            className="basic-2/6 h-[40px] hidden md:block sm:h-[52px] bg-secondaryColor px-5 lg:px-7 text-sm lg:text-base mt-0 whitespace-nowrap"
          >
            Bắt đầu chiến dịch
          </Button>
        </Link>

        <div className="basic-2/6 hidden lg:block">
          {user ? (
            <Link to={`/profileSetting`}>
              <div className="flex gap-x-3 items-center">
                <img
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  src={user.avtUser}
                  alt=""
                />
                <div>
                  <p className="text-text3 font-semibold text-sm">Xin chào,</p>
                  <p className="text-base text-text1 dark:text-white whitespace-nowrap font-bold">
                    {user.name}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/sign-in">
              <Button className="text-sm md:text-base bg-primaryColor px-6 whitespace-nowrap">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>

        {!toggleSideBar ? (
          <>
            {user ? (
              <>
                <Link to={`/profileSetting`}>
                  <img
                    className="sm:hidden w-[40px] h-[40px] object-cover rounded-full"
                    src={user.avtUser}
                    alt=""
                  />
                </Link>
              </>
            ) : (
              <div className="w-[40px] h-[40px] sm:hidden rounded-full flex justify-center items-center bg-primaryColor">
                <Link to="/sign-in">
                  <FontAwesomeIcon
                    className="text-white"
                    icon={faUser}
                  ></FontAwesomeIcon>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div
            className="cursor-pointer md:hidden"
            onClick={() => handleToggleSideBar()}
          >
            <FontAwesomeIcon
              className="text-text3 w-[20px] h-[20px]"
              icon={faBars}
            ></FontAwesomeIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDashBoard;
