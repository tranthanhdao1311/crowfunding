import { lazy } from "react";
import LayoutDashboard from "./layout/DefaultLayout/LayoutDashboard";
import DefaultLayoutAuth from "./layout/DefaultLayout/DefaultLayoutAuth";
import PaymentCampaign from "./pages/Payment/PaymentCampaign";
import { useLocation } from "react-router-dom";

const SignIn = lazy(() => import("./pages/auth/SignIn/SignIn"));
const AddPerkCampaign = lazy(() => import("./pages/Campaign/AddPerkCampaign"));
const UpdateCampaign = lazy(() => import("./pages/Campaign/UpdateCampaign"));
const Category = lazy(() => import("./pages/Category/Category"));
const SignUp = lazy(() => import("./pages/auth/SignUp/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Campaign = lazy(() => import("./pages/Campaign/Campaign"));
const CampaignDetails = lazy(() => import("./pages/Campaign/CampaignDetails"));
const ResultsCampaignSearch = lazy(() =>
  import("./pages/Campaign/ResultsCampaignSearch")
);
const StartCampaignPage = lazy(() =>
  import("./pages/Campaign/StartCampaignPage")
);
const Payment = lazy(() => import("./pages/Payment/Payment"));
const ProfileSetting = lazy(() =>
  import("./pages/ProfileSetting/ProfileSetting")
);
const WithDraw = lazy(() => import("./pages/WithDraw/WithDraw"));

const publicRouter = [
  { path: "/sign-up", component: SignUp, layout: DefaultLayoutAuth },
  { path: "/sign-in", component: SignIn, layout: DefaultLayoutAuth },
  { path: "/", component: Dashboard },
  { path: "/campaign", component: Campaign },
  { path: "/category/:name", component: Category },
  {
    path: "/searchResults/:value",
    component: ResultsCampaignSearch,
  },
  {
    path: "/campaign/:title",
    component: CampaignDetails,
  },
  {
    path: "/campaign/addperk/:id",
    component: AddPerkCampaign,
  },
  {
    path: "/campaign/update/:id",
    component: UpdateCampaign,
  },
  {
    path: "/start-campaign",
    component: StartCampaignPage,
  },
  { path: "/payment", component: Payment },
  { path: "/campaign/:title/payment/:id", component: PaymentCampaign },
  {
    path: "/ProfileSetting",
    component: ProfileSetting,
  },
  { path: "/WithDraw", component: WithDraw },
];

export { publicRouter };
