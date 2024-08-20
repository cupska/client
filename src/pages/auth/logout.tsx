import { useEffect } from "react";
import { authServices } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [logout, { isSuccess }] = authServices.useLogoutMutation();
  // console.log(isSuccess, res);
  const navigate = useNavigate();
  useEffect(() => {
    logout(null);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  return <></>;
}
