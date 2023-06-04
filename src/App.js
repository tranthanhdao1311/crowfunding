import React, { Fragment, Suspense, startTransition, useEffect } from "react";
import { publicRouter } from "./configRouter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import DefaultLayoutAuth from "./layout/DefaultLayout/DefaultLayoutAuth";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getToken, logOut } from "./utils/auth";
import { authRefreshToken, authUpdateUser } from "./store/auth/auth-slice";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "./index.scss";
import { createLogger } from "redux-logger";
import SignUp from "./pages/auth/SignUp/SignUp";
import LayoutDashboard from "./layout/DefaultLayout/LayoutDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const customStyles = {
//   content: {},
// };

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
Modal.defaultStyles = {};

function App() {
  const user = useSelector((state) => state.auth.user);
  const dark = useSelector((state) => state.darkMode.dark);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.id) {
      const { access_token } = getToken();

      dispatch(authUpdateUser({ user: user, accessToken: access_token }));
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(authUpdateUser({}));
        logOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Suspense fallback="">
      <Router>
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.component;
            let Layout = LayoutDashboard;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.layout === DefaultLayoutAuth ? (
                    <Suspense>
                      <Layout>
                        <Page></Page>
                      </Layout>
                    </Suspense>
                  ) : (
                    <Layout>
                      <Suspense
                        fallback={
                          <div className={`${dark ? "dark" : ""} loading`}>
                            <FontAwesomeIcon
                              className="animate-spin"
                              icon={faSpinner}
                            ></FontAwesomeIcon>
                          </div>
                        }
                      >
                        <Page />
                      </Suspense>
                    </Layout>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
