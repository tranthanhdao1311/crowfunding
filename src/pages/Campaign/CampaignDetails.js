import {
  faSquareFacebook,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faFolder,
  faShareFromSquare,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Heading from "../../components/common/Heading";
import Button from "../../components/Button/Button";
import Input from "../../components/Input";
import { set, useForm } from "react-hook-form";
import parse from "html-react-parser";
import CampaignPerk from "../../modules/Campaign/CampaignPerk";
import CampaignSimilar from "../../modules/Campaign/CampaignSimilar";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import Label from "../../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal, setShowResult } from "../../store/campaign/slice";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFormatRaised from "../../hooks/useFormatRaised";
import useFormatDate from "../../hooks/useFormatDate";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Thumbs, FreeMode } from "swiper";
import { apiCampaigns } from "../../constants/api";
import InputTypeNumber from "../../components/InputTypeNumber";
// import { PayPalButton } from "react-paypal-button-v2";

const CampaignDetails = () => {
  SwiperCore.use([Autoplay]);

  const showModal = useSelector((state) => state.campaign.showModal);
  const dark = useSelector((state) => state.darkMode.dark);
  // const showResult = useSelector((state) => state.campaign.setShowResult);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowResult(false));
  }, [dispatch]);
  const { control } = useForm();

  const handleClickProject = () => {
    dispatch(setShowModal(!showModal));
  };

  const handleCloseModal = () => {
    dispatch(setShowModal(!showModal));
  };

  const param = useParams();
  const { title } = param;
  const [detailPost, setDetailPost] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns);
      const post = response.data.find((post) => post.title === title);
      setDetailPost(post);
    }
    fetchData();
  }, [title]);
  const vntAmount = detailPost?.raisedAmount / 0.000043;
  const { formatCurrentRaised, percent, formatNumber } = useFormatRaised(
    detailPost?.goal,
    vntAmount
  );

  const { daysLeft } = useFormatDate(detailPost);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [valueAmount, setValueAmount] = useState();
  const [showError, setShowError] = useState(false);

  const handleChangeValueAmount = (e) => {
    setShowError(false);
    const numericValue = e.target.value.replace(/\D/g, ""); // Loại bỏ các ký tự không phải số
    setValueAmount(Number(numericValue));
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (valueAmount >= 10000) {
      navigate(`payment/${detailPost?.id}`, {
        state: { detailPost, valueAmount },
      });
    } else {
      setShowError(true);
    }
  };
  return (
    <div className="w-full">
      {showModal && (
        <ReactModal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          overlayClassName="fixed inset-0 bg-black bg-opacity-30 z-[60] flex items-center justify-center"
          className={`${
            dark ? "dark" : ""
          } bg-white dark:bg-darkBg px-10 py-10 outline-none w-[521px] max-h-[90vh] rounded-lg overflow-y-auto  `}
        >
          <div className="relative">
            <div className="text-right  sticky top-0 ">
              <FontAwesomeIcon
                onClick={() => handleCloseModal()}
                className="text-text3 text-3xl  cursor-pointer"
                icon={faClose}
              ></FontAwesomeIcon>
            </div>
            <div className="flex flex-col gap-y-5 mb-10 ">
              <div>
                <p className="text-center text-text1 dark:text-white font-bold text-xl mb-10">
                  Lựa chọn
                </p>
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="amount">Nhập số tiền đóng góp</Label>

                  <input
                    placeholder="100.000 VNĐ"
                    type="text"
                    autoComplete="off"
                    id="amount"
                    value={valueAmount}
                    name="amount"
                    onChange={(e) => handleChangeValueAmount(e)}
                    className={`${
                      showError ? "dark:border-error border-error" : ""
                    } w-full bg-white dark:bg-darkBg dark:text-white dark:border-darkStroke placeholder:dark:text-text4 placeholder:text-text4 text-text1 border  outline-none pl-6 py-4 leading-5 text-sm rounded-xl`}
                  ></input>
                  {showError && (
                    <p className="text-xs text-error">
                      Số tiền đóng góp nhỏ nhất là 10.000 đ
                    </p>
                  )}
                </div>
              </div>

              <p className="text-text3 text-sm">
                Đóng góp không đi kèm với đặc quyền
              </p>
              <Button
                onClick={handleNavigate}
                className="bg-primaryColor px-11"
              >
                Tiếp tục
              </Button>
              {/* <PayPalButton
                amount={Number(valueAmount)}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );

                  // OPTIONAL: Call your server to save the transaction
                  return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderId: data.orderID,
                    }),
                  });
                }}
                options={{
                  clientId: "PRODUCTION_CLIENT_ID",
                }}
                onError={() => {
                  alert("Paypal error");
                }}
              /> */}
            </div>
            <div>
              {detailPost.perk?.length > 0 &&
                detailPost?.perk.map((item) => (
                  <CampaignPerk
                    key={item.id}
                    data={item}
                    campaignData={detailPost}
                  ></CampaignPerk>
                ))}
            </div>
          </div>
        </ReactModal>
      )}

      <div className="w-full h-[140px] relative mb-10 ">
        {/* <div className="w-full h-full absolute  z-10"></div> */}
        <img
          className="w-full h-full object-cover rounded-3xl"
          src={`/${detailPost.category?.imgCate}`}
          alt=""
        />

        <Link
          to={`/category/${detailPost.category?.name}`}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-[40px] font-bold "
        >
          {detailPost.category?.name}
        </Link>
      </div>
      <div className="flex flex-col gap-y-8 pb-20">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-x-10">
          <div className="custom-slide-detail w-full lg:w-[55%] h-full">
            <Swiper
              grabCursor={true}
              loop={true}
              // navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
            >
              <div className="w-full h-[398px] object-cover rounded-3xl">
                {detailPost.video && (
                  <SwiperSlide>
                    <iframe
                      width="100%"
                      height="398px"
                      src={detailPost.video}
                      title="HUMANKINDNESS FILM INDIEGOGO VIDEO & TEASER TRAILE R"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </SwiperSlide>
                )}

                {detailPost?.arrImage?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <img
                      className="w-full h-[398px] cursor-pointer"
                      src={item}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>

            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              onSwiper={setThumbsSwiper}
              className="mt-6"
            >
              {detailPost?.video && (
                <SwiperSlide>
                  <div className="gallery">
                    <img
                      className="w-full h-[100px] border cursor-pointer"
                      src={detailPost?.imageCampaign}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {detailPost?.arrImage?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="gallery">
                    <img
                      className="w-full h-[100px] border cursor-pointer"
                      src={item}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full lg:w-[45%] h-full mt-5">
            <div className="mb-4">
              <div className="flex text-text3 justify-between items-center">
                <div className="flex gap-x-2">
                  <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
                  <Link
                    to={`/category/${detailPost?.category?.name}`}
                    className="text-sm"
                  >
                    {detailPost?.category?.name}
                  </Link>
                </div>
                <div className="flex gap-x-4">
                  <FontAwesomeIcon icon={faSquareFacebook}></FontAwesomeIcon>
                  <FontAwesomeIcon icon={faSquareTwitter}></FontAwesomeIcon>
                  <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>
                </div>
              </div>
              <div className="mb-6">
                <Heading className="mb-0">{detailPost?.title}</Heading>
                <p className="text-text3 text-sm font-normal">
                  {detailPost?.desc}
                </p>
              </div>
              <div className="mb-6 flex gap-x-5 items-center">
                <img
                  className="w-[60px] h-[60px] rounded-full object-cover"
                  src={detailPost?.infoUser?.avtUser}
                  alt=""
                />
                <div className="flex flex-col gap-y-1">
                  <div className="flex gap-x-4">
                    <span>{detailPost?.infoUser?.name}</span>
                    <span>
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="text-amber-300"
                        icon={faStar}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <span className="text-primaryColor opacity-80 font-normal text-sm">
                      02 Campaign
                    </span>
                    <span className="w-[6px] h-[6px] bg-text3 rounded-full"></span>
                    <span className="text-text3 text-sm">
                      {detailPost?.country}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <span>
                  {percent}% của {formatNumber}
                </span>
              </div>
              <div className="py-3 pr-3">
                <div className="w-full h-[5px] bg-[#efefef] rounded-sm overflow-hidden">
                  <div
                    style={{ width: `${percent}%` }}
                    className={` h-[5px] bg-primaryColor rounded-sm`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 ">
              <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0  gap-x-16">
                <div>
                  <p className="text-text2  dark:text-white text-xl font-semibold leading-6 whitespace-nowrap">
                    {formatCurrentRaised}
                  </p>
                  <span className="text-text4 font-normal text-base leading-4 whitespace-nowrap">
                    Trên tổng {formatNumber}
                  </span>
                </div>
                <div>
                  <p className="text-text2 dark:text-white text-xl font-semibold leading-6">
                    {detailPost.supporter ? detailPost.supporter : 0}
                  </p>
                  <span className="text-text4 font-normal text-base leading-4 whitespace-nowrap">
                    Người ủng hộ
                  </span>
                </div>
                <div>
                  <p className="text-text2 dark:text-white text-xl font-semibold leading-6">
                    {daysLeft}
                  </p>
                  <span className="text-text4 font-normal text-base leading-4 whitespace-nowrap">
                    Ngày còn lại
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleClickProject()}
                className="bg-primaryColor w-full"
              >
                Xem tùy chọn
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1170px] ">
        <div className="border-y-[1px] mt-24 ">
          <div className="flex justify-between py-5  items-center">
            <ul className="flex cursor-pointer gap-x-14 text-text3 text-sm">
              <li className="text-secondaryColor font-semibold">Chiến dịch</li>
            </ul>
            <Button
              onClick={() => handleClickProject()}
              className="bg-primaryColor w-[208px] h-[52px] "
            >
              Xem tùy chọn
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-x-32 mt-6 justify-between relative ">
          <div className="lg:w-[60%]">
            <p>STORY</p>
            <div className="w-full dark:text-white">
              <div className="story-css-content">
                {parse(detailPost.content || "")}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[40%] flex flex-col sticky top-0  ">
            <p className="text-text1 dark:text-white text-base font-semibold my-3   ">
              Chọn một tùy chọn
            </p>
            <div className="w-full lg:h-[700px]  lg:overflow-y-auto">
              <div className=" py-5 px-6 flex flex-col gap-y-5 hover:shadow-lg border dark:border-darkStroke dark:bg-darkBg hover:border-[#ccc] rounded-xl mb-8">
                <p className="text-center text-text3 font-medium text-xl">
                  Nhập số tiền đóng góp
                </p>

                <input
                  placeholder="100.000 VNĐ"
                  type="text"
                  autoComplete="off"
                  id="amount"
                  value={valueAmount}
                  name="amount"
                  onChange={(e) => handleChangeValueAmount(e)}
                  className={`${
                    showError ? "dark:border-error border-error" : ""
                  } w-full bg-white dark:bg-darkBg dark:text-white dark:border-darkStroke placeholder:dark:text-text4 placeholder:text-text4 text-text1 border  outline-none pl-6 py-4 leading-5 text-sm rounded-xl`}
                ></input>
                {showError && (
                  <p className="text-xs text-error">
                    Số tiền đóng góp nhỏ nhất là 10.000 đ
                  </p>
                )}
                <div className="p-5 bg-[#f7f7f7] dark:bg-darkSecondary rounded-lg">
                  <p className="text-text2 dark:text-text4 font-semibold text-sm">
                    Bạn tin tưởng dự án này
                  </p>
                  <p className="text-text3 text-sm mt-5">
                    Đóng góp không đi kèm với đặc quyền
                  </p>
                </div>
                <Button
                  className="bg-secondaryColor w-full"
                  onClick={handleNavigate}
                >
                  Tiếp tục
                </Button>
              </div>
              {detailPost.perk?.length > 0 &&
                detailPost?.perk.map((item) => (
                  <CampaignPerk
                    key={item.id}
                    data={item}
                    campaignData={detailPost}
                  ></CampaignPerk>
                ))}
            </div>
            <div className="w-full"></div>
          </div>
        </div>
      </div>
      <CampaignSimilar data={detailPost.category?.name}></CampaignSimilar>
    </div>
  );
};

export default CampaignDetails;
