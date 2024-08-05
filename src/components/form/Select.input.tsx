import { InputHTMLAttributes, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export default function SelectInput({
  children,
  formRegister,
  isError = false,
  ...inputProps
}: {
  children: ReactNode;
  formRegister?: UseFormRegisterReturn;
  isError?: boolean;
} & InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{inputProps.title}</span>
      </div>
      <select
        className={"select select-bordered " + (isError && " select-error")}
        {...formRegister}
        {...inputProps}
      >
        {children}
      </select>
    </label>
  );
}
