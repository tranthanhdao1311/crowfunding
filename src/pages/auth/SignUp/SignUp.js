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

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("This email already registered ")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be 8 character"),
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
  };
  const handleSetValueImg = (name, value) => {
    setAvtUser(value);
  };

  return (
    <>
      <HeadingAuth title="Sign Up"></HeadingAuth>
      <p className="text-center text-sm font-normal text-text3 pb-5 lg:pb-7">
        Already have an account?
        <Link to="/sign-in" className="text-primaryColor ml-1 underline ">
          Sign In
        </Link>
      </p>
      <ButtonGoogle text="Sign up with Google"></ButtonGoogle>
      <p className=" dark:text-white flex justify-center lg:p-3 text-sm font-normal leading-6 text-text2 mt-5 lg:mt-3">
        Or sign up with email{" "}
      </p>
      <form onSubmit={handleSubmit(handleBtnSignUp)}>
        <Field>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            error={errors.name?.message}
            placeholder="Ex: Jhon Doe"
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
            placeholder="example@gmail.com"
            type="email"
            control={control}
            // onChange={() => {}}
          ></Input>
        </Field>

        <Field>
          <Label htmlFor="password">Password *</Label>
          <InputTogglePassword
            error={errors.password?.message}
            id="password"
            control={control}
            placeholder="Create a password"
          ></InputTogglePassword>
        </Field>
        <Field>
          <Label htmlFor="avt-user">Avatar</Label>
          <ImageUpload
            onChange={handleSetValueImg}
            name="avtUser"
            id="avtUser"
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
            I agree to the{" "}
            <Link to="/" className="text-secondaryColor underline">
              Terms of Use
            </Link>{" "}
            and have read and understand the{" "}
            <Link to="/" className="text-secondaryColor underline ">
              Privacy policy.
            </Link>
          </p>
        </Checkbox>
        <Button type="submit" className="bg-primaryColor w-full lg:mt-3 mt-4">
          Create my account
        </Button>
      </form>
    </>
  );
};

export default withErrorBoundary(SignUp, {
  FallbackComponent: ErrorComponent,
});
