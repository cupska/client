import { ReactNode } from "react";

export const ErrorInputValidation = ({ children }: { children: ReactNode }) => (
  <div className=" text-error text-opacity-80 text-sm error-validation whitespace-pre-line">
    {children}
  </div>
);
