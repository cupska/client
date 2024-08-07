import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const session = useSelector((state: RootState) => state.session);
  const navigate = useNavigate();
  useEffect(() => {
    if (!session.user.id) navigate("auth/login");
  }, []);
  console.log(session);
  return children;
}
