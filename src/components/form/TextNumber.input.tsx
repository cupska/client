import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// gunakan attr TITLE untuk melabeli input
export default function TextNumberInput({
  formRegister,
  isError,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  formRegister?: UseFormRegisterReturn;
  isError: boolean;
}) {
  return (
    <>
      <label className="form-control flex w-full  ">
        <div className="label">
          <span className="label-text">{props.title}</span>
        </div>
        <input
          type="text"
          className={
            "input input-bordered w-full " + (isError && " input-error")
          }
          {...formRegister}
          {...props}
        />
      </label>
    </>
  );
}
