import { ReactNode } from "react";
import SideNavbar from "../ui/sideNavbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className=" flex m-auto ">
      <div className=" px-4 lg:px-10 py-10">
        <SideNavbar />
      </div>
      <div className="  min-h-dvh  pr-10 py-10 flex-grow">
        <div className=" bg-white h-full p-10 rounded-2xl">{children}</div>
      </div>
    </div>
  );
}
