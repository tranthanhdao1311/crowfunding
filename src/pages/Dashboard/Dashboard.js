import React, { useEffect, useState } from "react";

import CampainItemFeature, {
  SkeletonCampaignItem,
} from "../../modules/Campaign/CampaignItemFeature";
import CampaignPopular from "../../modules/Campaign/CampaignPopular";
import CampaignRecent from "../../modules/Campaign/CampaignRecent";
import Heading from "../../components/common/Heading";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiCampaigns } from "../../constants/api";
import Skeleton from "../../components/Skeleton/Skeleton";
import ReactModal from "react-modal";
import Button from "../../components/Button/Button";
import { setFirstAccess } from "../../store/access/access-slice";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const firstAccess = useSelector((state) => state.access.firstAccess);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const newData =
    user && user.id && data.filter((item) => item.infoUser.id === user.id);

  const firstNewData = newData?.[0];

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiCampaigns, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken} `,
        },
      });
      setData(response.data);
    }
    fetchData();
  }, [accessToken]);

  // if (!firstNewData) return <SkeletonCampaignItem></SkeletonCampaignItem>;
  // if (!user && !user?.id) return null;

  // lần đầu vào trang web thì hiện thông báo
  useEffect(() => {
    localStorage.setItem("firstAccess", firstAccess);
  }, [firstAccess]);

  const handleAccess = () => {
    dispatch(setFirstAccess(!firstAccess));
  };

  return (
    <>
      <div className="w-full">
        <Heading>
          <Link to="/campaign">
            Your Campaign{" "}
            {user ? (
              <span className="text-secondaryColor">({newData?.length})</span>
            ) : (
              "(đăng nhập để xem chiến dịch của bạn)"
            )}
          </Link>
        </Heading>

        {newData && newData?.length <= 0 && (
          <SkeletonCampaignItem></SkeletonCampaignItem>
        )}
        {user && user.id && firstNewData && (
          <CampainItemFeature data={firstNewData}></CampainItemFeature>
        )}

        <CampaignPopular></CampaignPopular>
        <CampaignRecent></CampaignRecent>
      </div>
      {!firstAccess && (
        <ReactModal
          isOpen={true}
          overlayClassName="fixed inset-0 bg-black bg-opacity-30 z-[60] flex items-center justify-center"
          className="bg-liteBg relative  px-10 py-10 outline-none max-w-[700px] rounded-lg "
        >
          <div className="flex flex-col gap-y-3 mb-4 ">
            <img
              src="/ellipse.png"
              className="absolute bottom-0 left-0 right-0 z-[-1]"
              alt=""
            />
            <p className=" text-text3 text-lg font-semibold">Xin chào bạn!</p>
            <p className="leading-8 text-text1">
              Chào mừng bạn đến với trang web gọi vốn cộng đồng và quyên góp quỹ
              từ thiện! Chúng tôi là nền tảng kết nối giữa những người có ý muốn
              tốt và những dự án đáng khen ngợi. Với chúng tôi, bạn có thể làm
              việc cùng nhau để thực hiện những ý tưởng tuyệt vời, hỗ trợ những
              người cần thiết và làm thay đổi cộng đồng.
            </p>
          </div>

          <div className="text-center">
            <Button
              className="bg-secondaryColor px-9 "
              onClick={() => handleAccess()}
            >
              Tiếp tục
            </Button>
          </div>
        </ReactModal>
      )}
    </>
  );
};

export default Dashboard;
