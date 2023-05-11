import { takeLatest } from "redux-saga/effects";
import {
  authLogin,
  authLogoutUser,
  authRefreshToken,
  authRegister,
  profileUser,
} from "./auth-slice";
import handleAuthRegister, {
  handleAuthLogin,
  handleAuthRefreshToken,
  handleLogoutUser,
  handleUpdateProfile,
} from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authLogoutUser.type, handleLogoutUser);
}
