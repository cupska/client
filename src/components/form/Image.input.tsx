import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IMG_RESTRICTION_TYPE } from "../constants";

export default function ImageInputV2({
  formRegister,
  isError = false,
  defaultImage,
}: {
  formRegister: UseFormRegisterReturn;
  isError: boolean;
  defaultImage?: string;
}) {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    if (typeof defaultImage === "string")
      setImage(import.meta.env.VITE_API_URL + "/img/" + defaultImage);
  }, [defaultImage]);
  return (
    <label
      className={
        " relative  form-control rounded-lg border-opacity-50 h-60 border border-dashed border-accent " +
        (isError && " border-error")
      }
    >
      <div className=" absolute left-1/2 bottom-1/2 text-center -translate-x-1/2 translate-y-1/2">
        <MdAddPhotoAlternate className=" text-6xl text-accent text-center w-full" />
        <div className=" text-gray-400">upload gambar</div>
      </div>
      {image && (
        <img
          src={image}
          className=" bg-green-100 w-fit absolute left-1/2 -translate-x-1/2 bottom-1/2 translate-y-1/2 object-scale-down h-[90%]"
        />
      )}
      <input
        type="file"
        multiple={false}
        accept={IMG_RESTRICTION_TYPE.join()}
        // defaultValue={``}
        {...formRegister}
        onChange={(e) => {
          e.target.files && setImage(URL.createObjectURL(e.target.files[0]));
          formRegister.onChange(e);
        }}
        className={" hidden form-control-file input w-full max-w-6xl"}
      />
    </label>
  );
}
