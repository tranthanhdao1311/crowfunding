import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const handleScroll = () => {
    const scrollY = document.documentElement.scrollTop;
    if (scrollY > 300) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isShow && (
        <div
          onClick={() => handleScrollToTop()}
          className="fixed right-8 bottom-10 rounded-full bg-primaryColor cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-white px-4 py-3"
            icon={faArrowUp}
          ></FontAwesomeIcon>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
