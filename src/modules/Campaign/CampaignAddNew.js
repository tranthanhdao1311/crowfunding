import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import Input from "../../components/Input";
import Dropdown from "../Dropdown/Dropdown";
import Label from "../../components/Label";
import SelectDropdown from "../Dropdown/SelectDropdown";
import List from "../Dropdown/List";
import Option from "../Dropdown/Option";
import TextArea from "../../components/TextArea";
import ReactQuill from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import Search from "../Dropdown/Search";
import axios from "axios";
import useOnChange from "../../hooks/useOnChange";
import { toast } from "react-toastify";
import ImageUpload from "../../components/Image/ImageUpload";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../../components/FieldInput";
import FieldRowInput from "../../components/FieldRowInput";
import FieldInputFull from "../../components/FieldInputFull";
import { apiCampaigns } from "../../constants/api";
import RequiredAuthPage from "../Auth/RequiredAuthPage";
import SignIn from "../../pages/auth/SignIn/SignIn";
import { optionCate } from "../../constants/cate";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image"],
  ],
};

const schema = yup.object().shape({
  title: yup.string().required("Please enter your title"),
  desc: yup.string().required("Please enter your desc"),
  category: yup.object().required("Please select category"),
  country: yup.string().required("Please select country"),
  startDate: yup.string().required("Please select start date"),
  endDate: yup.string().required("Please select end date"),
  // content: yup.string().required("Please enter your content"),
  // imageCampaign: yup.string().required("File is required"),
  // goal: yup.string().min(0).integer().required("Please enter your goal"),
});

const CampaignAddNew = () => {
  const user = useSelector((state) => state.auth.user);
  const infoUser = {
    id: user?.id,
    name: user?.name,
    avtUser: user?.avtUser,
  };

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: {},
      desc: "",
      raisedAmount: 0,
      goal: "",
      video: "",
      country: "",
      startDate: "",
      endDate: "",
      perk: [],
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [content, setContent] = useState("");

  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(500);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (!filterCountry) return;
    async function fetchApiCountry() {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${filterCountry}`
        );
        setCountries(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchApiCountry();
  }, [filterCountry]);

  const [labelCate, setLabelCate] = useState("");
  const handleClickOptionCate = (value) => {
    setValue("category", value);
    setLabelCate(value.name);
  };

  const [labelCountry, setLabelCountry] = useState("");
  const handleClickOptionCountry = (value) => {
    setValue("country", value);
    setLabelCountry(value);
  };

  const [arrImg, setArrImg] = useState([]);
  const handleSetValueImg = (name, value) => {
    setValue(name, value);
    setArrImg([...arrImg, getValues(name)]);
  };

  const handleCreateCampaign = async (values) => {
    try {
      await axios.post(apiCampaigns, {
        ...values,
        content,
        arrImage: arrImg,
        infoUser: infoUser,
      });

      toast.success("Tạo chiến dịch thành công!");
      reset({
        title: "",
        category: {},
        desc: "",
        video: "",
        goal: "",
        country: "",
        startDate: "",
        endDate: "",
      });
      setLabelCountry("");
      setLabelCate("");
      setContent("");
    } catch (error) {
      toast.error("Can't not create new campaign");
    }
  };

  return (
    <div className=" bg-white dark:bg-darkBg rounded-xl lg:py-10 lg:px-[66px] ">
      <div className="text-center mb-10">
        <h1 className=" sm:w-auto text-text2 whitespace-nowrap bg-text4 inline-block bg-opacity-10 rounded-xl px-4 sm:px-6 py-4 text-base sm:text-lg font-bold">
          Bắt đầu một chiến dịch 🚀
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleCreateCampaign)}>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="title">Tiêu đề chiến dịch *</Label>
            <Input
              control={control}
              id="title"
              type="text"
              name="title"
              placeholder="Viết tiêu đề..."
            ></Input>
          </FieldRowInput>
          <FieldRowInput>
            <Dropdown control={control} name="category" id="category">
              <Label htmlFor="category">Chọn một danh mục *</Label>
              <SelectDropdown placeholder={labelCate || "Chọn một danh mục"}>
                <List>
                  {optionCate.map((item) => (
                    <Option
                      onClick={() => handleClickOptionCate(item)}
                      key={item.id}
                    >
                      {item.name}
                    </Option>
                  ))}
                </List>
              </SelectDropdown>
            </Dropdown>
          </FieldRowInput>
        </FieldInput>

        <FieldInputFull>
          <Label htmlFor="desc">Mô tả ngắn * *</Label>
          <TextArea
            control={control}
            placeholder="Viết một mô tả ngắn...."
            name="desc"
          ></TextArea>
        </FieldInputFull>

        <FieldInputFull>
          <Label htmlFor="content">Câu chuyện * *</Label>
          <ReactQuill
            placeholder="Nội dung chiến dịch...."
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </FieldInputFull>
        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="imageCampaign">Hình ảnh</Label>
            <div className="flex gap-x-3">
              <ImageUpload
                className="w-[200px] h-[200px]"
                onChange={handleSetValueImg}
                name="imageCampaign"
                id="imageCampaign"
              ></ImageUpload>
              <ImageUpload
                className="w-[200px] h-[200px]"
                onChange={handleSetValueImg}
                name="imageCampaign1"
                id="imageCampaign1"
              ></ImageUpload>
              <ImageUpload
                className="w-[200px] h-[200px]"
                onChange={handleSetValueImg}
                name="imageCampaign2"
                id="imageCampaign2"
              ></ImageUpload>
            </div>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="goal">Mục tiêu *</Label>
            <Input
              control={control}
              id="goal"
              type="text"
              name="goal"
              placeholder="0 VND"
            ></Input>
          </FieldRowInput>
        </FieldInput>

        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="video">Video</Label>
            <Input
              control={control}
              id="video"
              type="text"
              name="video"
              placeholder="Video"
            ></Input>
            <span className="font-normal text-sm text-text3">
              Đặt URL video Youtube hoặc Vimeo
            </span>
          </FieldRowInput>

          <FieldRowInput>
            <Dropdown control={control} id="country" name="country">
              <Label htmlFor="country">Quốc gia</Label>
              <SelectDropdown placeholder={labelCountry || "Chọn quốc gia"}>
                <List>
                  <Search
                    onChange={setFilterCountry}
                    placeholder={"Tìm kiếm quốc gia..."}
                  ></Search>
                  {countries.length > 0 &&
                    countries.map((item) => (
                      <Option
                        key={item?.name?.common}
                        onClick={() =>
                          handleClickOptionCountry(item?.name?.common)
                        }
                      >
                        {item?.name?.common}
                      </Option>
                    ))}
                </List>
              </SelectDropdown>
            </Dropdown>
          </FieldRowInput>
        </FieldInput>

        <FieldInput>
          <FieldRowInput>
            <Label htmlFor="startDate">Ngày bắt đầu</Label>
            <Input
              control={control}
              id="startDate"
              type="date"
              name="startDate"
              placeholder="Ngày bắt đầu"
            ></Input>
          </FieldRowInput>
          <FieldRowInput>
            <Label htmlFor="endDate">Ngày kết thúc</Label>
            <Input
              control={control}
              id="endDate"
              type="date"
              name="endDate"
              placeholder="Ngày kết thúc"
            ></Input>
          </FieldRowInput>
        </FieldInput>
        <div className="text-center">
          <Button
            className="bg-secondaryColor text-sm md:text-base px-9 mt-6"
            type="submit"
          >
            Tạo chiến dịch mới
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignAddNew;
