import React, { useEffect } from "react";
import Heading from "../../components/common/Heading";
import FieldInput from "../../components/FieldInput";
import FieldRowInput from "../../components/FieldRowInput";
import Label from "../../components/Label";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import FieldInputFull from "../../components/FieldInputFull";
import ImageUpload from "../../components/Image/ImageUpload";
import InputTogglePassword from "../../components/InputTogglePassword";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { profileUser } from "../../store/auth/auth-slice";
import axios from "axios";

const ProfileSetting = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { control, setValue, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const handleUpdateUser = async (values) => {
    console.log(values);
  };
  return (
    <div className="w-full bg-white rounded-xl md:py-10 md:px-[66px]">
      <div className="mb-8">
        <Heading className="text-2xl mb-1">Account Information</Heading>
        <p className="font-normal text-text3 text-sm">
          Update your account information
        </p>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <FieldInputFull className="items-center">
          <ImageUpload
            name="image-user"
            id="image-user"
            onChange={setValue}
            className="rounded-full"
          ></ImageUpload>
        </FieldInputFull>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="name">User name</Label>
            <Input
              control={control}
              type="text"
              name="name"
              id="name"
              placeholder="User name"
            ></Input>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            ></Input>
          </FieldRowInput>
        </FieldInput>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="new-password">New Password</Label>
            <InputTogglePassword
              control={control}
              id="new-password"
              name="new-password"
              placeholder="New Password"
            ></InputTogglePassword>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <InputTogglePassword
              control={control}
              id="confirm-password"
              placeholder="Confirm Password"
            ></InputTogglePassword>
          </FieldRowInput>
        </FieldInput>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="birth">Date of Birth</Label>
            <Input
              control={control}
              type="date"
              name="birth"
              id="birth"
              placeholder="Date of Birth"
            ></Input>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              control={control}
              type="text"
              name="phone"
              id="phone"
              placeholder="Mobile Number"
            ></Input>
          </FieldRowInput>
        </FieldInput>
        <Button
          type="submit"
          className="bg-secondaryColor px-14 block mx-auto mt-10"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default ProfileSetting;
