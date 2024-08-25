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
    reset,
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
  const akunDemoHandler = () => {
    reset({ username: "@usertest", password: "user123" });
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
        onSubmit={handleSubmit(submitHandler)}
        className=" lg:max-w-64 flex flex-col m-auto gap-y-4 my-6"
      >
        <TextNumberInput
          title="Username"
          id="username"
          formRegister={register("username")}
          isError={!!errors.username}
        />

        <ErrorInputValidation>{errors?.username?.message}</ErrorInputValidation>

        <TextNumberInput
          title="Kata sandi"
          id="password"
          type="password"
          formRegister={register("password")}
          isError={!!errors.password}
        /> 

        <ErrorInputValidation>{errors?.password?.message}</ErrorInputValidation>

        <div className=" flex flex-col items-center">
          <Button
            type="submit"
            className=" btn-primary w-full lg:w-2/3"
            isLoading={loginLoading}
          >
            Masuk
          </Button>
          <Button
            type="button"
            onClick={akunDemoHandler}
            className=" mt-2 btn-ghost w-full lg:w-2/3"
          >
            akun demo
          </Button>
        </div>
      </form>
      <div className=" mt-2 ">
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
