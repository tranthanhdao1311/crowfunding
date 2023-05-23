import { call, put } from "redux-saga/effects";
import {
  profileUser,
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefreshToken,
  requestAuthRegister,
} from "./auth-requests";
import { toast } from "react-toastify";
import { logOut, saveToken } from "../../utils/auth";
import { authUpdateUser } from "./auth-slice";

export default function* handleAuthRegister(action) {
  const { payload } = action;

  try {
    const response = yield call(requestAuthRegister, payload);
    if (response.status === 201) {
      toast.success("Đăng kí tài khoản thành công!");
    }
  } catch (error) {
    toast.error("Email đã được sử dụng!");
  }
}

function* handleAuthLogin({ payload }) {
  try {
    const response = yield call(requestAuthLogin, payload);

    if (response.data) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
      toast.success("Đăng nhập thành công!");
    }
  } catch (error) {
    const response = error.response.data;
    console.log(error);
    if (error.response.status === 401) {
      toast.error("Tài khoản chưa được đăng kí!");
    }
    if (response.statusCode === 403) {
      toast.error(response.error.message);
    }
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.status === 200) {
      yield put(
        authUpdateUser({
          user: response.data,
          accessToken: payload,
        })
      );
    }
  } catch (error) {}
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.data) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield handleAuthFetchMe({
        payload: response.data.accessToken,
      });
    }
  } catch (error) {}
}

// function* handleUpdateProfile() {
//   yield call(profileUser());
// }

function* handleLogoutUser() {
  yield put(authUpdateUser({}));
  logOut();
}

export {
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleLogoutUser,
};
