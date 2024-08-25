import { ReactNode, useRef } from "react";
import { Drawer } from "../ui/Drawer";

import { RiHome4Fill, RiLogoutBoxFill, RiProfileFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../ui/Header";
import { IoMenu } from "react-icons/io5";

const baseUrl = "/dashboard/";

export const links: { icon: ReactNode; label: string; path: string }[] = [
  {
    icon: <RiHome4Fill className=" text-2xl" />,
    label: "Produk",
    path: baseUrl + "produk",
  },
  {
    icon: <RiProfileFill className=" text-2xl" />,
    label: "Profile",
    path: baseUrl + "profile",
  },
  {
    icon: <RiLogoutBoxFill className=" text-2xl" />,
    label: "Logout",
    path: "/logout",
  },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const drawerRef = useRef<HTMLInputElement>(null);
  return (
    <div className=" md:flex m-auto max-md:min-h-dvh max-md:bg-white">
      <div className=" max-md:hidden px-4 lg:px-10 py-10">
        <SideNavbar />
      </div>
      <div className=" md:hidden">
        <Header>
          <div className=" flex justify-center w-full">
            <button className=" " onClick={() => drawerRef?.current?.click()}>
              <IoMenu className=" text-3xl text-gray-500" />
            </button>
            <span className=" inline-block m-auto font-medium text-4xl font-amsterdam">
              Squid
            </span>
          </div>
        </Header>
        <div>
          <Drawer ref={drawerRef}>
            <SideNavbar />
          </Drawer>
        </div>
      </div>
      <div className="  md:min-h-dvh flex-1 px-4 md:w-3 md:pr-10 md:py-10 flex-grow">
        <div className=" bg-white h-full md:p-10  md:rounded-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function SideNavbar() {
  const location = useLocation();
  return (
    <nav className="">
      <ul className=" [&>li]:min-w-[1px] *:text-gray-500">
        {links.map((link, i) => {
          const isActive =
            (location.pathname.startsWith(link.path) && !location.hash) ||
            link.path == location.hash;
          return (
            <li key={i}>
              <Link
                to={link.path}
                replace
                className={
                  " text-sm font-bold group flex items-center py-4 gap-x-4 px-4 active:bg-white  rounded-2xl "
                }
              >
                <span
                  className={
                    (isActive && " text-[#eaecee] bg-accent ") +
                    " p-2 text-sm rounded-xl group-hover:bg-accent group-hover:text-[#eaecee]"
                  }
                >
                  {link.icon}
                </span>
                <span
                  className={
                    (isActive && " text-black") + " group-hover:text-black"
                  }
                >
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
