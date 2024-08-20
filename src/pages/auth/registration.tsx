import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../../lib/zod-validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextNumberInput from "../../components/form/TextNumber.input";
import { ErrorInputValidation } from "../../components/form/ErrorInputValidation";

import { userServices } from "../../services/user.services";
import { authServices } from "../../services/auth";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToast } from "../../features/toastSlice";

type registerSchemaType = z.infer<typeof registerSchema>;
const defaultValues: registerSchemaType = import.meta.env.DEV
  ? {
      fullname: "yusuf",
      username: "yusuf.kurn",
      password: "Yusyus123",
      passwordConfirm: "Yusyus123",
    }
  : {
      fullname: "",
      password: "",
      passwordConfirm: "",
      username: "",
    };

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    getValues,
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues,
    criteriaMode: "all",
    mode: "onChange",
  });

  const [usernameCheckerMutate, usernameCheckerState] =
    userServices.useCheckUsernameCheckerMutation();
  const [regisMutate, { isLoading, isSuccess, isError }] =
    authServices.useRegistrationMutation();

  useEffect(() => {
    const usernameVal = getValues("username");
    usernameVal.length >= 6 && usernameCheckerMutate(usernameVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("username")]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(addToast({ elm: "Berhasil mendaftar", status: "success" }));
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
    if (isError)
      dispatch(addToast({ elm: "Gagal mendaftar", status: "error" }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const submitHandler = (data: registerSchemaType) => {
    regisMutate(data);
  };
  console.log({ errors, isSuccess });
  return (
    <>
      <form
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className=" grid col-span-6 grid-cols-subgrid">
          <div className=" col-span-3">
            <TextNumberInput
              title="Nama lengkap"
              id="fullname"
              formRegister={register("fullname")}
              isError={!!errors.fullname}
            />
          </div>
          <div className=" col-span-6">
            <ErrorInputValidation>
              {errors?.fullname?.message}
            </ErrorInputValidation>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-subgrid">
          <div className=" col-span-3">
            <TextNumberInput
              title="Username"
              id="username"
              formRegister={register("username")}
              isError={!!errors?.username}
            />
          </div>
          <div className=" col-span-6">
            {!errors?.username ? (
              <>
                {watch("username").length >= 6 ? (
                  <>
                    {usernameCheckerState?.data?.data?.username?.isExist ? (
                      <ErrorInputValidation>
                        Username sudah digunakan
                      </ErrorInputValidation>
                    ) : (
                      <ErrorInputValidation>
                        <span className=" text-success">
                          <FaRegCheckCircle className=" inline-block mr-2" />
                          username tersedia
                        </span>
                      </ErrorInputValidation>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <ErrorInputValidation>
                {errors?.username?.message}
              </ErrorInputValidation>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <TextNumberInput
            title="Kata sandi"
            id="password"
            type="password"
            formRegister={register("password")}
            isError={!!errors?.password}
          />
          <ErrorInputValidation>
            {errors?.password?.types &&
              Object.values(errors?.password?.types).join("\n")}
          </ErrorInputValidation>
        </div>
        <div className="col-span-3">
          <TextNumberInput
            title="Konfirmasi kata sandi"
            id="passwordConfirm"
            type="password"
            formRegister={register("passwordConfirm")}
            isError={!!errors?.passwordConfirm}
          />
          <ErrorInputValidation>
            {errors?.passwordConfirm?.types &&
              Object.values(errors?.passwordConfirm?.types).join("\n")}
          </ErrorInputValidation>
        </div>
        <div className="col-span-6">
          <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="checkbox checkbox-primary border-[#1f293733] rounded-full checkbox-sm"
            />

            <span className="text-sm text-gray-700 dark:text-gray-200">
              I want to receive emails about events, product updates and company
              announcements.
            </span>
          </label>
        </div>
        <div className="col-span-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-gray-700 underline dark:text-gray-200">
              terms and conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-700 underline dark:text-gray-200">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div className="col-span-6 m-auto sm:flex sm:items-center sm:gap-4">
          <Button type="submit" isLoading={isLoading}>
            Daftar
          </Button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
            Already have an account?
            <NavLink
              to={"/auth/login"}
              className="text-gray-700 underline dark:text-gray-200"
            >
              Log in
            </NavLink>
            .
          </p>
        </div>
      </form>
    </>
  );
}
