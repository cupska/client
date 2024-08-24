import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode }) {
  return <div className="navbar p-4 w-full  bg-base-100">{children}</div>;
}
