import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  children,
  isLoading = false,
  type,
  title,
}: {
  isLoading?: boolean;
  children: ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "title">) {
  return (
    <button
      className={
        "group relative inline-flex  items-center overflow-hidden btn " +
        (!isLoading ? " btn-primary" : " btn-disabled")
      }
      type={type}
      title={title}
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
