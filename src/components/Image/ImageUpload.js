import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { keyImgbb } from "./../../../src/constants/keyImgbb";

const ImageUpload = ({ name, id, onChange, className }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSelectImage = async (e) => {
    const bodyFormData = new FormData();
    const file = e.target.files[0];
    if (!file) return;

    bodyFormData.append("image", file);
    const response = await axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${keyImgbb}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setImageUrl(response.data.data.url);
    onChange(name, response.data.data.url);
  };
  return (
    <label
      className={`relative overflow-hidden flex justify-center items-center  border border-dashed rounded-lg cursor-pointer ${className}`}
    >
      <input
        name={name}
        id={id}
        type="file"
        className="hidden"
        onChange={handleSelectImage}
      ></input>
      <FontAwesomeIcon
        className="text-4xl text-text3 "
        icon={faFileImage}
      ></FontAwesomeIcon>
      {/* {imageUrl.map((img) => ( */}
      {imageUrl && (
        <img
          className="w-full h-full object-cover absolute top-0 left-0 "
          src={imageUrl}
          alt=""
        />
      )}

      {/* ))} */}
    </label>
  );
};

export default ImageUpload;
