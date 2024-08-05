import { InputHTMLAttributes } from "react";
import TextNumberInput from "./TextNumber.input";

export default function SearchInput({
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <TextNumberInput
      placeholder=""
      isError={false}
      type="search"
      {...inputProps}
    />
  );
}
