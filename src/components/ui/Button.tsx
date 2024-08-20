import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  children,
  isLoading = false,
  type,
  title,
  ...rest
}: {
  isLoading?: boolean;
  children: ReactNode;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "title" | "onClick"
>) {
  return (
    <button
      className={
        "group relative inline-flex  items-center overflow-hidden btn " +
        (!isLoading ? " btn-primary" : " btn-disabled")
      }
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
