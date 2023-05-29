import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import FieldRowInput from "../../components/FieldRowInput";
import Label from "../../components/Label";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../constants/api";
import Heading from "../../components/common/Heading";
import FieldInput from "../../components/FieldInput";
import TextArea from "../../components/TextArea";
import ImageUpload from "../../components/Image/ImageUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputTypeNumber from "../../components/InputTypeNumber";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  quantity: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() !== "" ? parseInt(originalValue) : undefined;
    })
    .max(9999, "Số lương không vượt quá 10000")
    .nullable(),
  desc: yup.string().required("Vui lòng nhập mô tả"),
  // image: yup.string().required("Vui lòng chọn hình ảnh"),
  price: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() !== "" ? parseInt(originalValue) : undefined;
    })
    .min(0)
    .required("Vui lòng nhập giá tiền"),
  // retailPrice: yup
  //   .number()
  //   .transform((value, originalValue) => {
  //     return originalValue.trim() !== "" ? parseInt(originalValue) : undefined;
  //   })
  //   .min(0)
  //   .required("Vui lòng nhập giá bán lẻ"),
  monthYearShip: yup.string(),
});

const AddPerkCampaign = () => {
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      desc: "",
      quantity: "",
      image: "",
      price: "",
      retailPrice: "",
      monthYearShip: "",
      id: "",
    },
    resolver: yupResolver(schema),
  });
  const { dark } = useSelector((state) => state.darkMode);
  // select date
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // validate
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);

  async function FetchIdItem(data) {
    try {
      const response = await axios.get(`${apiUrl}/api/campaigns/${id}`);
      const currentPerk = response.data.perk;

      const updateDataPerk = {
        ...response.data,
        perk: [...currentPerk, data],
      };
      const putResponse = await axios.put(
        `${apiUrl}/api/campaigns/${id}`,
        updateDataPerk
      );
      console.log(putResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  // select img
  const [fileImg, setFileImg] = useState();
  const handleChangImg = (name, value) => {
    setValue(name, value);
    getValues(name);
    setFileImg(getValues(name));
  };
  const handleUpdateItem = async (values) => {
    const result = {
      ...values,
      image: fileImg,
      monthYearShip: selectedDate,
      id: uuidv4(),
    };
    try {
      await FetchIdItem(result);
      toast.success("Thêm đặc quyền thành công!");
      reset({});
      setValue("image", "");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!id) return null;
  return (
    <div className="w-full bg-white dark:bg-darkBg rounded-xl md:py-10 md:px-[66px]">
      {/* <div className="text-center mb-10">
        <h1 className=" sm:w-auto text-text2 whitespace-nowrap bg-text4 inline-block bg-opacity-10 rounded-xl px-4 sm:px-6 py-4 text-base sm:text-lg font-bold">
          Tạo đặc quyền 🚀
        </h1>
      </div> */}
      <Heading className="text-2xl">Tạo đặc quyền cho id: {id}</Heading>
      <form onSubmit={handleSubmit(handleUpdateItem)}>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              control={control}
              id="title"
              type="text"
              name="title"
              placeholder="Tiêu đề"
            ></Input>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="quantity">Số lượng</Label>
            <InputTypeNumber
              control={control}
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Số lượng"
            ></InputTypeNumber>
          </FieldRowInput>
        </FieldInput>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="price">Giá *</Label>
            <InputTypeNumber
              control={control}
              id="price"
              type="text"
              name="price"
              placeholder="Giá"
            ></InputTypeNumber>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="retailPrice">Giá bán lẻ *</Label>
            <InputTypeNumber
              control={control}
              id="retailPrice"
              type="text"
              name="retailPrice"
              placeholder="Giá bán lẻ"
            ></InputTypeNumber>
          </FieldRowInput>
        </FieldInput>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="image">Hình ảnh *</Label>
            <ImageUpload
              onChange={handleChangImg}
              className="w-full h-[300px]"
              id="image"
              name="image"
            ></ImageUpload>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="desc">Mô tả</Label>
            <TextArea
              control={control}
              id="desc"
              type="text"
              name="desc"
              placeholder="Mô tả"
            ></TextArea>
          </FieldRowInput>
        </FieldInput>
        <FieldInput>
          <FieldRowInput className={`${dark ? "dark" : ""}`}>
            <Label htmlFor="monthYearShip">Dự kiến giao hàng</Label>
            <DatePicker
              id="monthYearShip"
              name="monthYearShip"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              placeholderText="Tháng/Năm"
              showMonthYearPicker
            />
          </FieldRowInput>
        </FieldInput>

        <div className="text-center mt-10">
          <Button
            type="submit"
            className={`${
              isSubmitting ? " pointer-events-none opacity-50" : ""
            } bg-secondaryColor w-[200px]`}
          >
            {isSubmitting ? (
              <FontAwesomeIcon
                className="animate-spin "
                icon={faSpinner}
              ></FontAwesomeIcon>
            ) : (
              "Tạo đặc quyền"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPerkCampaign;
