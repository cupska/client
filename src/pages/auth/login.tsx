import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextNumberInput from "../../components/form/TextNumber.input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../../lib/zod-validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorInputValidation } from "../../components/form/ErrorInputValidation";
import { authServices } from "../../services/auth";
import * as Toast from "../../components/ui/Toast";
import { useEffect } from "react";

type loginSchemaType = z.infer<typeof loginSchema>;
export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const [loginMutate, { isSuccess, isError, isLoading: loginLoading }] =
    authServices.useLoginMutation();

  useEffect(() => {
    navigate("/dashboard/produk");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="  grid col-span-6 grid-cols-subgrid">
          <div className=" lg:col-span-3 col-span-6">
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
          <div className=" lg:col-span-3 col-span-6">
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
        <div className=" col-span-6 text-center">
          <Button type="submit" className=" w-2/3" isLoading={loginLoading}>
            Masuk
          </Button>
        </div>
      </form>
      <div className=" mt-2">
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
