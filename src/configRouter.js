import { lazy } from "react";
import DefaultLayoutAuth from "./layout/DefaultLayout/DefaultLayoutAuth";
import LayoutDashboard from "./layout/DefaultLayout/LayoutDashboard";
import Category from "./pages/Category/Category";

const SignIn = lazy(() => import("./pages/auth/SignIn/SignIn"));
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
  { path: "/", component: Dashboard, layout: LayoutDashboard },
  { path: "/campaign", component: Campaign, layout: LayoutDashboard },
  { path: "/category/:name", component: Category, layout: LayoutDashboard },
  {
    path: "/searchResults/:value",
    component: ResultsCampaignSearch,
    layout: LayoutDashboard,
  },
  {
    path: "/campaign/:title",
    component: CampaignDetails,
    layout: LayoutDashboard,
  },
  {
    path: "/start-campaign",
    component: StartCampaignPage,
    layout: LayoutDashboard,
  },
  { path: "/payment", component: Payment, layout: LayoutDashboard },
  {
    path: "/ProfileSetting",
    component: ProfileSetting,
    layout: LayoutDashboard,
  },
  { path: "/WithDraw", component: WithDraw, layout: LayoutDashboard },
];

export { publicRouter };
