import { ReactNode } from "react";
import { RiHome4Fill, RiLogoutBoxFill, RiProfileFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const baseUrl = "/dashboard/";

const links: { icon: ReactNode; label: string; path: string }[] = [
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
    path: "#logout",
  },
];

export default function SideNavbar() {
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
