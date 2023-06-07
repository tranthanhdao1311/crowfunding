import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeadingAuth from "../../../components/HeadingAuth/HeadingAuth";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../../components/common/ErrorComponent";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Field from "../../../components/Field";
import InputTogglePassword from "../../../components/InputTogglePassword";
import Checkbox from "../../../components/Checkbox";
import Button from "../../../components/Button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import ButtonGoogle from "../../../components/Button/ButtonGoogle";
import { useDispatch } from "react-redux";
import { authRegister } from "../../../store/auth/auth-slice";
import ImageUpload from "../../../components/Image/ImageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên của bạn"),
  email: yup
    .string()
    .email("This email already registered ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải có 8 kí tự"),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avtUser: "",
    },
    resolver: yupResolver(schema),
  });

  const watchAgreeSignUp = watch("statusAgree");

  const dispatch = useDispatch();

  const [avtUser, setAvtUser] = useState("");

  const handleBtnSignUp = (values) => {
    const totalValue = { ...values, avtUser };
    dispatch(authRegister(totalValue));
    reset({});
    setAvtUser("");
  };
  const handleSetValueImg = (name, value) => {
    setAvtUser(value);
  };

  return (
    <>
      <HeadingAuth title="Đăng ký"></HeadingAuth>
      <p className="text-center text-sm font-normal text-text3 pb-5 lg:pb-7">
        Bạn đã có tài khoản?
        <Link to="/sign-in" className="text-primaryColor ml-1 underline ">
          Đăng nhập
        </Link>
      </p>
      <ButtonGoogle text="Sign up with Google"></ButtonGoogle>
      <p className=" dark:text-white flex justify-center lg:p-3 text-sm font-normal leading-6 text-text2 mt-5 lg:mt-3">
        Hoặc đăng ký với email{" "}
      </p>
      <form onSubmit={handleSubmit(handleBtnSignUp)}>
        <Field>
          <Label htmlFor="name">Họ tên *</Label>
          <Input
            id="name"
            name="name"
            error={errors.name?.message}
            placeholder="Ví dụ: Nguyễn Văn A"
            type="text"
            control={control}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="email">Email *</Label>
          <Input
            name="email"
            id="email"
            error={errors.email?.message}
            placeholder="nguyenvana@gmail.com"
            type="email"
            control={control}
            // onChange={() => {}}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password">Mật khẩu *</Label>
          <InputTogglePassword
            error={errors.password?.message}
            id="password"
            control={control}
            placeholder="Tạo mật khẩu"
          ></InputTogglePassword>
        </Field>
        <Field>
          <Label htmlFor="avt-user">Ảnh đại diện</Label>
          <ImageUpload
            onChange={handleSetValueImg}
            name="avtUser"
            id="avtUser"
            className="w-[50%] h-[150px]"
          ></ImageUpload>
        </Field>

        <Checkbox
          name="term"
          checked={watchAgreeSignUp === true}
          onClick={() => {
            setValue("statusAgree", !watchAgreeSignUp);
          }}
        >
          <p className="h-[56px] font-normal lg:text-sm text-xs  text-text2 dark:text-text3 py-3 lg:pr-5 pr-3 ">
            Tôi đồng ý với{" "}
            <Link to="/" className="text-secondaryColor underline">
              Điều khoản sử dụng
            </Link>{" "}
            và đã đọc và hiểu{" "}
            <Link to="/" className="text-secondaryColor underline ">
              Chính sách quyền riêng tư.
            </Link>
          </p>
        </Checkbox>
        <Button
          type="submit"
          className={`${
            isSubmitting ? "pointer-events-none opacity-50" : ""
          } bg-primaryColor w-full lg:mt-3 mt-4  `}
        >
          {isSubmitting ? (
            <FontAwesomeIcon
              className="animate-spin"
              icon={faSpinner}
            ></FontAwesomeIcon>
          ) : (
            "Tạo tài khoản"
          )}
        </Button>
      </form>
    </>
  );
};

export default withErrorBoundary(SignUp, {
  FallbackComponent: ErrorComponent,
});
