import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";

type GeneralType = { children: ReactNode };
function ToastWrapper({ children }: GeneralType) {
  return <div className="toast toast-top toast-end *:text-sm">{children}</div>;
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
  return (
    <>
      <ToastWrapper>
        {contents.map((val, i) => (
          <li key={i} className=" list-none">
            {val.status === "error" && <Error>{val.elm}</Error>}
            {val.status === "success" && (
              <Success>
                {val.elm}
                {i}
              </Success>
            )}
          </li>
        ))}
      </ToastWrapper>
    </>
  );
}

export { ToastWrapper, Success, Error };
