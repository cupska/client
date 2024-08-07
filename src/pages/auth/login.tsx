import { NavLink } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextNumberInput from "../../components/form/TextNumber.input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../../lib/zod-validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorInputValidation } from "../../components/form/ErrorInputValidation";
import { authSevices } from "../../services/auth";
import * as Toast from "../../components/ui/Toast";
import { useDispatch } from "react-redux";
import { setSession } from "../../features/authSlice";
import { useEffect } from "react";

type loginSchemaType = z.infer<typeof loginSchema>;
export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [loginMutate, { isSuccess, isError, data: user }] =
    authSevices.useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSession({ user: user.data.user }));
    }
  }, [isSuccess]);

  const submitHandler = (data: loginSchemaType) => {
    loginMutate(data);
  };
  return (
    <>
      {isSuccess && (
        <Toast.ToastWrapper>
          <Toast.Success>Berhasil Login</Toast.Success>
        </Toast.ToastWrapper>
      )}
      {isError && (
        <Toast.ToastWrapper>
          <Toast.Error>Gagal Login</Toast.Error>
        </Toast.ToastWrapper>
      )}

      <form
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className=" grid col-span-6 grid-cols-subgrid">
          <div className=" col-span-3">
            <TextNumberInput
              title="Username"
              id="username"
              formRegister={register("username")}
              isError={!!errors.username}
            />
          </div>
          <div className=" col-span-6">
            <ErrorInputValidation>
              {errors?.username?.message}
            </ErrorInputValidation>
          </div>
        </div>
        <div className=" grid col-span-6 grid-cols-subgrid">
          <div className=" col-span-3">
            <TextNumberInput
              title="Kata sandi"
              id="password"
              formRegister={register("password")}
              isError={!!errors.password}
            />
          </div>
          <div className=" col-span-6">
            <ErrorInputValidation>
              {errors?.password?.message}
            </ErrorInputValidation>
          </div>
        </div>
        <div className=" w-fit m-auto">
          <Button type="submit">Masuk</Button>
        </div>
      </form>
      <div>
        Belum memiliki akun?{" "}
        <NavLink
          to={"/auth/registration"}
          className={" dark:text-white underline"}
        >
          Daftar sekarang
        </NavLink>{" "}
      </div>
    </>
  );
}
