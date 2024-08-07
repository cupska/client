import { useEffect } from "react";
import { authSevices } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../features/authSlice";
import { RootState } from "../../lib/redux/store";

export default function Logout() {
  const [logout, { isSuccess, ...res }] = authSevices.useLogoutMutation();
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session);
  console.log(isSuccess, res);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearSession());
      if (!session.user.id) {
        navigate("/auth/registration");
      }
    } else logout("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, session]);
  return (
    <>
      <div>logout</div>
    </>
  );
}
