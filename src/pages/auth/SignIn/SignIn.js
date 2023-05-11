import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { withErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import ErrorComponent from "../../../components/common/ErrorComponent";
import Field from "../../../components/Field";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import HeadingAuth from "../../../components/HeadingAuth/HeadingAuth";
import { Link } from "react-router-dom";
import InputTogglePassword from "../../../components/InputTogglePassword";
import ButtonGoogle from "../../../components/Button/ButtonGoogle";
import { useDispatch } from "react-redux";
import { authLogin } from "../../../store/auth/auth-slice";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("This email already registered ")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Password must be 8 character")
    .required("Please enter your password"),
});
const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const handleBtnSignUp = (values) => {
    dispatch(authLogin(values));
    console.log(values);
  };

  return (
    <div>
      <HeadingAuth title="Welcome Back!"></HeadingAuth>
      <p className="text-center text-sm font-normal text-text3 pb-5 lg:pb-7">
        Dont have an account?
        <Link to="/sign-up" className="text-primaryColor ml-1 underline">
          Sign up
        </Link>
      </p>
      <ButtonGoogle text="Sign in with Google"></ButtonGoogle>
      <form onSubmit={handleSubmit(handleBtnSignUp)}>
        <Field>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            error={errors.email?.message}
            control={control}
            placeholder="example@gmail.com"
            type="email"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password *</Label>
          <InputTogglePassword
            placeholder="Enter Password"
            control={control}
            error={errors.password?.message}
          ></InputTogglePassword>
        </Field>

        <Link
          to="/forgot-password"
          className="flex justify-end py-3 text-primaryColor cursor-pointer font-medium text-sm"
        >
          Forgot password
        </Link>

        <Button type="submit" className="bg-primaryColor w-full lg:mt-3 mt-4">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default withErrorBoundary(SignIn, {
  FallbackComponent: ErrorComponent,
});
