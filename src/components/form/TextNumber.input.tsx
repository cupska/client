import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// gunakan attr TITLE untuk melabeli input
export default function TextNumberInput({
  formRegister,
  isError,
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  formRegister?: UseFormRegisterReturn;
  isError: boolean;
}) {
  const [showPassword, setShowPassword] = useState(type != "password");
  return (
    <>
      <label className="form-control relative flex w-full  ">
        <div className="label">
          <span className="label-text">{props.title}</span>
        </div>
        <div className=" relative">
          <input
            type={showPassword ? "text" : "password"}
            className={
              "input input-bordered w-full " +
              (isError && " input-error") +
              " " +
              className
            }
            {...formRegister}
            {...props}
          />
          {type == "password" && (
            <button
              type="button"
              className=" absolute top-1/2 text-gray-500 -translate-y-1/2 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
      </label>
    </>
  );
}
