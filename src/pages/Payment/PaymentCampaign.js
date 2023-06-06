import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import PaymentMethod from "../../modules/Payment/PaymentMethod";
import ContributionSummury from "../../modules/Payment/ContributionSummury";
import { useSelector } from "react-redux";
import RequiredAuthPage from "../../modules/Auth/RequiredAuthPage";
import Label from "../../components/Label";
import FieldInput from "../../components/FieldInput";
import FieldRowInput from "../../components/FieldRowInput";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSpinner } from "@fortawesome/free-solid-svg-icons";
import InputPhone from "../../components/InputPhone";

const schema = yup.object().shape({
  address: yup.string().required("Vui lòng nhập địa chỉ giao hàng"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại của bạn")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
});
const PaymentCampaign = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const location = useLocation();

  const dataParent = location?.state.campaignData || location?.state.detailPost;
  const dataPrice = location.state.valueAmount;
  const dataChild = dataParent?.perk.find((item) => item.id === id);
  // const dataChild1 = dataParent.id === id;

  const [privilege, setPrivilege] = useState(false);
  useEffect(() => {
    if (dataChild) {
      setPrivilege(true);
    }
  }, [dataChild, privilege]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: "",
      phone: "",
    },
    resolver: yupResolver(schema),
  });

  const [editPhone, setEditPhone] = useState(false);
  const handleEditPhone = () => {
    setEditPhone(true);
  };

  const [editAddress, setEditAddress] = useState(false);

  const handleEditAddress = () => {
    setEditAddress(true);
  };
  const [value, setValue] = useState({});
  const [showBtn, setShowBtn] = useState(true);

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  // const handleChangePhone = (e) => {
  //   const reg = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
  //   if (reg.test(e.target.value) === true) {
  //     setPhoneNumber(e.target.value);
  //   }
  // };

  const handleSubmitForm = (values) => {
    const valueForm = {
      ...values,
      name: user?.name,
      email: user?.email,
      // phone: phoneNumber,
    };
    setValue(valueForm);
    setShowBtn(false);
    setEditPhone(false);
    setEditAddress(false);
  };
  if (id === "undefined") return null;
  return (
    <RequiredAuthPage>
      <div className="w-full md:flex items-start gap-x-5 lg:gap-x-11  justify-between mr-0 lg:mr-10">
        <div className="flex-1 ">
          <div className="">
            <div className="mb-5">
              <p className="text-text2 dark:text-text4 text-lg font-medium pb-2">
                Bạn đang đóng góp
              </p>
              <p className="text-text1 dark:text-white text-2xl font-semibold">
                {dataParent.title}
              </p>
            </div>
            <div className="flex gap-x-3 items-center mb-5">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={user?.avtUser}
                alt=""
              />
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm">01 Campaign | {dataParent.country}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <FieldInput className="">
                <FieldRowInput className="gap-y-0 ">
                  <Label>Họ tên</Label>
                  <p className="text-text1 dark:text-white">{user?.name}</p>
                </FieldRowInput>
                <FieldRowInput className="gap-y-0">
                  <Label>Email</Label>
                  <p className="text-text1 dark:text-white">{user?.email}</p>
                </FieldRowInput>
              </FieldInput>
              {privilege && (
                <FieldInput>
                  <FieldRowInput className="gap-y-0">
                    <Label htmlFor="address">Địa chỉ giao hàng</Label>
                    {!editAddress && value.address ? (
                      <div className="flex gap-x-3">
                        <span className="text-text1 dark:text-white">
                          {value.address}
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={handleEditAddress}
                            className="cursor-pointer text-text2 dark:text-white"
                          ></FontAwesomeIcon>
                        </span>
                      </div>
                    ) : (
                      <Input
                        error={errors.address?.message}
                        control={control}
                        name="address"
                        id="address"
                        placeholder="Nhập địa chỉ giao hàng..."
                      ></Input>
                    )}
                  </FieldRowInput>
                  <FieldRowInput className="gap-y-0">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    {!editPhone && value.phone ? (
                      <div className="flex gap-x-3">
                        <span className="text-text1 dark:text-white">
                          {value.phone}{" "}
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={handleEditPhone}
                            className="cursor-pointer text-text2 dark:text-white"
                          ></FontAwesomeIcon>
                        </span>
                      </div>
                    ) : (
                      <>
                        <Input
                          error={errors.phone?.message}
                          control={control}
                          name="phone"
                          id="phone"
                          placeholder="Nhập số liên lạc của bạn"
                        ></Input>
                      </>
                    )}
                  </FieldRowInput>
                </FieldInput>
              )}
              {privilege && (
                <>
                  {(editPhone || editAddress || showBtn) && (
                    <div className="text-center">
                      <Button
                        type="submit"
                        className={`${
                          isSubmitting ? "opacity-50 pointer-events-none" : ""
                        } bg-secondaryColor max-w-[200px] px-4 h-[46px] text-sm`}
                      >
                        {isSubmitting ? (
                          <FontAwesomeIcon
                            className="animate-spin"
                            icon={faSpinner}
                          ></FontAwesomeIcon>
                        ) : (
                          "Xác nhận thông tin"
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
          <div>
            <h2 className="font-bold text-lg leading-normal my-4">
              Thanh toán an toàn
            </h2>
            <PaymentMethod></PaymentMethod>
          </div>
        </div>
        <div className="mt-11 ">
          <ContributionSummury
            dataParent={dataParent}
            dataCampaign={dataChild || dataParent}
            price={dataPrice}
            error={errors}
            value={value}
            editAddress={editAddress}
            editPhone={editPhone}
          ></ContributionSummury>
        </div>
      </div>
    </RequiredAuthPage>
  );
};

export default PaymentCampaign;
