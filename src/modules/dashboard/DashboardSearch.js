import {
  faChessKing,
  faClose,
  faSearch,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowResult, setValueSearch } from "../../store/campaign/slice";

import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import { apiCampaigns } from "../../constants/api";

const DashboardSearch = ({ placeholder = "", type, name }) => {
  const valueSearch = useSelector((state) => state.campaign.valueSearch);
  const showResult = useSelector((state) => state.campaign.showResult);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { dark } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debounceValueCustom = useDebounce(valueSearch, 1000);

  const handleOnChange = (e) => {
    if (!e.target.value.startsWith(" ")) {
      dispatch(setValueSearch(e.target.value));
    }
  };
  const [resultsSearch, setResultsSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (debounceValueCustom && debounceValueCustom.length > 0) {
        try {
          setLoading(true);
          const response = await axios.get(apiCampaigns, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken} `,
            },
          });
          const item = response.data.filter((item) =>
            item.title.toLowerCase().includes(debounceValueCustom.toLowerCase())
          );
          setLoading(false);
          setResultsSearch(item);
        } catch (error) {
          console.log(error);
        }
      } else {
        setResultsSearch([]);
      }
    }
    fetchData();
  }, [debounceValueCustom]);

  const handleDeleteModalSearch = () => {
    dispatch(setShowResult(false));
  };

  const handleHideResult = () => {
    setShowResult(false);
    dispatch(setValueSearch(valueSearch));
    dispatch(setShowResult(false));
  };

  const handleDeleteValue = () => {
    dispatch(setValueSearch(""));
    dispatch(setShowResult(false));
  };

  const refInput = useRef(null);

  const handleSearchValue = async () => {
    if (valueSearch) {
      navigate(`/searchResults/${valueSearch}`);
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && valueSearch) {
      navigate(`/searchResults/${valueSearch}`);
      refInput.current.blur();
    }
  };

  return (
    <>
      <Tippy
        interactive
        appendTo={() => document.body}
        // visible={showResult && debounceValueCustom && valueSearch.length > 0}
        visible={showResult}
        placement="bottom-start"
        onClickOutside={handleHideResult}
        render={(attrs) => (
          <div
            className={`${
              dark ? "dark" : ""
            } lg:w-[843px] w-[458px] max-h-[600px] transition-all  bg-white dark:bg-darkStroke flex flex-col overflow-hidden gap-y-5 mt-2  pb-6   rounded-2xl   cursor-pointer  `}
            tabIndex="-1"
            {...attrs}
          >
            <div
              className={`flex rounded-2xl justify-between items-center p-4 pb-2 dark:bg-darkSoft  `}
            >
              {resultsSearch.length > 0 ? (
                <Link
                  to={`/searchResults/${valueSearch}`}
                  className="text-text1 dark:text-white font-medium text-sm underline "
                >
                  Xem tất cả {resultsSearch.length} chiến dịch
                </Link>
              ) : (
                <span className="text-text1 font-medium text-sm underline"></span>
              )}

              <FontAwesomeIcon
                className="bg-redSoft px-6 py-3 rounded-lg text-error"
                icon={faXmark}
                onClick={handleDeleteModalSearch}
              ></FontAwesomeIcon>
            </div>

            <ul className={`${dark ? "dark" : ""} flex flex-col bg-white`}>
              {loading && (
                <FontAwesomeIcon
                  className="animate-spin"
                  icon={faSpinner}
                ></FontAwesomeIcon>
              )}
              {!loading && resultsSearch.length === 0 ? (
                <li className="w-full font-normal  text-sm text-text1 dark:text-white  flex items-center gap-x-5 px-4 py-2  transition-all ">
                  Không có kết quả tìm kiếm
                </li>
              ) : (
                resultsSearch.slice(0, 4).map((item) => (
                  <li
                    key={item.id}
                    className="w-full flex items-center gap-x-5 px-4 py-2 hover:bg-primaryColor hover:bg-opacity-20 transition-all "
                  >
                    <div className="flex flex-col gap-y-1">
                      <Link
                        to={`/campaign/${item.title}`}
                        className="font-normal text-sm leading-5 text-text1 dark:text-white "
                      >
                        {item.title}
                      </Link>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      >
        <div className="bg-white dark:bg-darkSecondary flex items-center  gap-x-4 h-[40px] md:h-[58px] p-2 shadow-customBoxShadow dark:shadow-none rounded-full ">
          <label className="flex-1">
            <input
              className="outline-none w-full placeholder:text-text4 text-xs md:text-sm font-normal p-2 bg-transparent"
              placeholder={placeholder}
              name={name}
              id={name}
              ref={refInput}
              onKeyDown={(e) => handleOnKeyDown(e)}
              type={type}
              autoComplete="off"
              value={valueSearch}
              onChange={handleOnChange}
              onFocus={() => dispatch(setShowResult(true))}
            />
          </label>

          {valueSearch.length > 0 && (
            <FontAwesomeIcon
              className=" cursor-pointer text-text4"
              icon={faClose}
              onClick={handleDeleteValue}
            ></FontAwesomeIcon>
          )}

          <button
            type="button"
            onClick={() => handleSearchValue()}
            className="h-[30px] w-[43px] md:h-[48px] md:w-[72px] flex items-center justify-center rounded-full bg-primaryColor opacity-80 text-white"
          >
            <FontAwesomeIcon
              className="w-[14px] h-[14px] md:h-[18px] md:w-[18px]"
              icon={faSearch}
            ></FontAwesomeIcon>
          </button>
        </div>
      </Tippy>
    </>
  );
};

export default DashboardSearch;
