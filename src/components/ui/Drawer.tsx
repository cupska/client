import { forwardRef, LegacyRef, ReactNode } from "react";

export const Drawer = forwardRef(function (
  {
    children,
  }: {
    children: ReactNode;
  },
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        ref={ref}
        className="drawer-toggle"
      />
      {/* <div className="drawer-content"> 
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div> */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="  bg-base-200 text-base-content min-h-full min-w-72 p-4">
          {children}
        </div>
      </div>
    </div>
  );
});
