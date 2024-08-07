import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { popToast } from "../../features/toastSlice";

type GeneralType = { children: ReactNode };
function ToastWrapper({ children }: GeneralType) {
  return (
    <div className="toast z-10 toast-top toast-end *:text-sm">{children}</div>
  );
}

function Success({ children }: GeneralType) {
  return (
    <div className="alert alert-success">
      <span>{children}</span>
    </div>
  );
}
function Error({ children }: GeneralType) {
  return (
    <div className="alert alert-error">
      <span>{children}</span>
    </div>
  );
}
export default function MainToast() {
  const { contents } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  return (
    <>
      <ToastWrapper>
        {contents.map((val, i) => {
          setTimeout(() => {
            dispatch(popToast());
          }, 6800);
          return (
            <li key={i} className=" list-none z-auto">
              {val.status === "error" && <Error>{val.elm}</Error>}
              {val.status === "success" && <Success>{val.elm}</Success>}
            </li>
          );
        })}
      </ToastWrapper>
    </>
  );
}

export { ToastWrapper, Success, Error };
