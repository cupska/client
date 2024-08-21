import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  children,
  isLoading = false,
  type,
  title,
  className,
  ...rest
}: {
  isLoading?: boolean;
  children: ReactNode;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "title" | "onClick" | "className"
>) {
  return (
    <button
      className={` group relative inline-flex  items-center overflow-hidden btn 
        ${!isLoading ? " btn-primary" : " btn-disabled"} ${className} `}
      type={type}
      title={title}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          loading
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
